import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ItemDetailLayout from '../../components/items/ItemDetailLayout';
import styles from './ItemDetail.module.css';

export default function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = () => {
    router.push(`/items/edit/${id}`);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE',
      })
        .then(() => router.push('/items'))
        .catch((err) => console.error('Error deleting:', err));
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
            <button className={`btn btn-outline-primary ${styles.actionBtn}`} onClick={handleEdit}>
              Edit
            </button>
            <button className={`btn btn-outline-danger ${styles.actionBtn}`} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>

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
      </div>
    </ItemDetailLayout>
  );
}
