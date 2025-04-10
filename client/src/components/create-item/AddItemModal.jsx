'use client';
import React, { useState } from 'react';
import styles from './AddItemModal.module.css';
import { FiX, FiCalendar } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItemModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    type: '',
    name: '',
    image: '',
    status: '',
    price: '',
    purchase_date: '',
    description: '',
    fixed_asset: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error creating item');

      toast.success(`Item added with ID: ${data.item_id}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      onClose();
      setFormData({
        type: '',
        name: '',
        image: '',
        status: '',
        price: '',
        purchase_date: '',
        description: '',
        fixed_asset: false,
      });
    } catch (err) {
      toast.error(`❌ ${err.message}`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-semibold">Add New Item</h5>
            <FiX size={22} style={{ cursor: 'pointer' }} onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-2">
                  <label className="form-label">Type *</label>
                  <select className="form-select" name="type" onChange={handleChange} required>
                    <option value="">Choose type</option>
                    <option>Equipment</option>
                    <option>Furniture</option>
                    <option>Electronics</option>
                    <option>Software Licenses</option>
                    <option>Stationery</option>
                    <option>Tools</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">Image *</label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Price *</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    className="form-control"
                    placeholder="Enter price"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-2">
                  <label className="form-label">Item Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter item name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Status *</label>
                  <select className="form-select" name="status" onChange={handleChange} required>
                    <option value="">Choose Status</option>
                    <option>In Use</option>
                    <option>In Stock</option>
                    <option>Reserved</option>
                    <option>Under Maintenance</option>
                    <option>Out of Stock</option>
                    <option>Disposed</option>
                    <option>Damaged</option>
                    <option>Lost</option>
                    <option>Returned</option>
                    <option>Transferred</option>
                    <option>Pending Approval</option>
                    <option>For Disposal</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">Date of Purchased *</label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="purchase_date"
                      className="form-control"
                      placeholder="dd/mm/yyyy"
                      onChange={handleChange}
                      required
                    />
                    <span className="input-group-text"><FiCalendar /></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">Description *</label>
              <textarea
                className="form-control"
                name="description"
                placeholder="Input description"
                rows={3}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" id="fixedAsset" name="fixed_asset" onChange={handleChange} />
              <label className="form-check-label" htmlFor="fixedAsset">Fixed Asset</label>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItemModal;
