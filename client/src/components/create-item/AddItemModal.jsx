'use client';
import React from 'react';
import styles from './AddItemModal.module.css';
import { FiX, FiPaperclip, FiCalendar } from 'react-icons/fi';

const AddItemModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-semibold">Add New Item</h5>
          <FiX size={22} style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>

        {/* Checkboxes */}
        <div className="d-flex gap-4 mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="groupItem" />
            <label className="form-check-label" htmlFor="groupItem">Group Item</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="consumableItem" />
            <label className="form-check-label" htmlFor="consumableItem">Consumable Item</label>
          </div>
        </div>

        {/* FORM */}
        <form>
          <div className="row g-3">
            {/* LEFT */}
            <div className="col-md-6">
              {/* Type Dropdown */}
              <div className="mb-2">
                <label className="form-label">Type *</label>
                <select className="form-select">
                  <option disabled selected>Choose type</option>
                  <option>Equipment</option>
                  <option>Furniture</option>
                  <option>Electronics</option>
                  <option>Software Licenses</option>
                  <option>Stationery</option>
                  <option>Tools</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="mb-2">
                <label className="form-label">Image *</label>
                <div className="input-group">
                  <input type="file" className="form-control" />
                  <span className="input-group-text"><FiPaperclip /></span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-2">
                <label className="form-label">Price *</label>
                <input type="text" className="form-control" placeholder="Enter price" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-md-6">
              {/* Item Name */}
              <div className="mb-2">
                <label className="form-label">Item Name *</label>
                <input type="text" className="form-control" placeholder="Enter item name" />
              </div>

              {/* Status Dropdown */}
              <div className="mb-2">
                <label className="form-label">Status *</label>
                <select className="form-select">
                  <option disabled selected>Choose Status</option>
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

              {/* ID */}
              <div className="mb-2">
                <label className="form-label">Item ID *</label>
                <input type="text" className="form-control" placeholder="Enter item number" />
              </div>

              {/* Date of Purchase */}
              <div className="mb-2">
                <label className="form-label">Date of Purchased *</label>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="dd/mm/yyyy" />
                  <span className="input-group-text"><FiCalendar /></span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-2">
            <label className="form-label">Description *</label>
            <textarea className="form-control" placeholder="Input description" rows={3}></textarea>
          </div>

          {/* Fixed Asset Checkbox */}
          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="fixedAsset" />
            <label className="form-check-label" htmlFor="fixedAsset">Fixed Asset</label>
          </div>

          {/* Footer Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
