import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ItemDetailLayout from '../../components/items/ItemDetailLayout';
import styles from './ItemDetail.module.css';
import { toast } from 'react-toastify';
import withAuth from '../../utils/withAuth';

const statusOptions = [
  'In Use', 'In Stock', 'Reserved', 'Under Maintenance', 'Out of Stock',
  'Disposed', 'Damaged', 'Lost', 'Returned', 'Transferred', 'Pending Approval', 'For Disposal'
];

function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/items/${id}`);
        const data = await res.json();
        setItem(data);
        setForm(data); // for editing
      } catch (err) {
        console.error('Error fetching item:', err);
        setItem({ error: 'Fetch failed' });
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');

      toast.success('Item updated successfully.');
      setItem(form);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating:', err);
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Item deleted successfully.');
        setTimeout(() => {
          router.push('/items');
        }, 2000);
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
    return <ItemDetailLayout><div className="p-5">Loading...</div></ItemDetailLayout>;

  if (!item || item?.error)
    return <ItemDetailLayout><div className="p-5 text-danger">Item not found.</div></ItemDetailLayout>;

  return (
    <ItemDetailLayout>
      <div className={`p-4 ${styles.wrapper}`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Item Description</h4>
          <div className="d-flex gap-2">
            {isEditing ? (
              <>
                <button className="btn btn-success" onClick={handleUpdate}>Save</button>
                <button className="btn btn-outline-secondary" onClick={() => { setIsEditing(false); setForm(item); }}>Cancel</button>
              </>
            ) : (
              <>
                <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="btn btn-outline-danger" onClick={() => setShowConfirm(true)}>Delete</button>
              </>
            )}
          </div>
        </div>

        <div className={`d-flex flex-column flex-md-row gap-4 ${styles.detailCard}`}>
          <div className={styles.imageWrapper}>
            {form.image ? (
              <img src={form.image} alt={form.name} className={styles.image} />
            ) : <span className="text-white-50">No Image</span>}
          </div>

          <div className={styles.infoBox}>
            <p><strong>ID:</strong> {form.item_id}</p>

            {isEditing ? (
              <>
                <p><strong>Item Name:</strong>
                  <input className="form-control mt-1" name="name" value={form.name} onChange={handleChange} />
                </p>
                <p><strong>Image URL:</strong>
                  <input className="form-control mt-1" name="image" value={form.image} onChange={handleChange} />
                </p>
                <p><strong>Type:</strong>
                  <input className="form-control mt-1" name="type" value={form.type} onChange={handleChange} />
                </p>
                <p><strong>Status:</strong>
                  <select className="form-select mt-1" name="status" value={form.status} onChange={handleChange}>
                    {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </p>
                <p><strong>Price:</strong>
                  <input className="form-control mt-1" type="number" name="price" value={form.price} onChange={handleChange} />
                </p>
                <p><strong>Purchase Date:</strong>
                  <input className="form-control mt-1" name="purchase_date" value={form.purchase_date} onChange={handleChange} />
                </p>
                <p><strong>Description:</strong>
                  <textarea className="form-control mt-1" name="description" value={form.description} onChange={handleChange} />
                </p>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="fixed_asset" checked={form.fixed_asset} onChange={handleChange} />
                  <label className="form-check-label">Fixed Asset</label>
                </div>
              </>
            ) : (
              <>
                <h5 className="fw-bold mb-3">{item.name}</h5>
                <p><strong>Purchase Date:</strong> {item.purchase_date}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Price:</strong> ₱ {Number(item.price).toLocaleString()}</p>
                <p><strong>Asset:</strong> {item.fixed_asset ? 'Yes' : 'No'}</p>
              </>
            )}
          </div>
        </div>

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

export default withAuth(ItemDetailPage);
