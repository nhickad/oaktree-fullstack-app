import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ItemDetailLayout from '../../components/items/ItemDetailLayout';
import styles from './ItemDetail.module.css';
import { toast } from 'react-toastify';

export default function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/items/${id}`);
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error('Error fetching item:', err);
        setItem({ error: 'Fetch failed' });
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Item deleted successfully.');
        setTimeout(() => {
          router.push('/items');
        }, 2000); // wait a bit so user sees toast
      } else {
        const data = await res.json();
        toast.error(data.error || 'Deletion failed.');
      }
    } catch (err) {
      console.error('Error deleting:', err);
      toast.error('Something went wrong.');
    } finally {
      setShowConfirm(false);
    }
  };

  if (loading)
    return (
      <ItemDetailLayout>
        <div className="p-5">Loading...</div>
      </ItemDetailLayout>
    );

  if (!item || item?.error)
    return (
      <ItemDetailLayout>
        <div className="p-5 text-danger">Item not found.</div>
      </ItemDetailLayout>
    );

  return (
    <ItemDetailLayout>
      <div className={`p-4 ${styles.wrapper}`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Item Description</h4>
          <div className="d-flex gap-2">
            <button className={`btn btn-outline-primary ${styles.actionBtn}`} onClick={() => router.push(`/items/edit/${id}`)}>
              Edit
            </button>
            <button className={`btn btn-outline-danger ${styles.actionBtn}`} onClick={() => setShowConfirm(true)}>
              Delete
            </button>
          </div>
        </div>

        {/* Detail Card */}
        <div className={`d-flex flex-column flex-md-row gap-4 ${styles.detailCard}`}>
          <div className={styles.imageWrapper}>
            {item.image ? (
              <img src={item.image} alt={item.name} className={styles.image} />
            ) : (
              <span className="text-white-50">No Image</span>
            )}
          </div>

          <div className={styles.infoBox}>
            <h5 className="fw-bold mb-3">{item.name}</h5>
            <p><strong>Purchase Date:</strong> {item.purchase_date || 'Unknown'}</p>
            <p><strong>Description:</strong> {item.description || 'Unknown'}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Price:</strong> ₱ {Number(item.price).toLocaleString()}</p>
            <p><strong>Asset:</strong> {item.fixed_asset ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Delete Confirmation Popup */}
        {showConfirm && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this item?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ItemDetailLayout>
  );
}
