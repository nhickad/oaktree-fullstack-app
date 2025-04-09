'use client';
import React, { useState } from 'react';
import styles from './Create.module.css';
import AddItemModal from './AddItemModal';
import { FiSearch, FiPlusCircle, FiFilter } from 'react-icons/fi';

const items = [
  {
    name: 'Gas Kitting',
    id: 'G-7893',
    type: 'IE Project Items',
    amount: '1 pcs',
    price: 'HQ',
    description: 'Activated',
    img: '/leftPanel.jpg',
  },
  {
    name: 'Condet',
    id: 'Co-7898',
    type: 'IE Project Items',
    amount: '3 pcs',
    price: 'HQ',
    description: 'Activated',
    img: '/leftPanel.jpg',
  },
  ...Array(8).fill({
    name: 'Condet',
    id: 'G-7893',
    type: 'IE Project Items',
    amount: '5 pcs',
    price: 'HQ',
    description: 'Activated',
    img: '/leftPanel.jpg',
  }),
];

const CreateMainContent = () => {
  const [modalOpen, setModalOpen] = useState(false); // ✅ Added modal state

  return (
    <div className={styles.cardWrapper}>
      <h5 className="fw-semibold">Create Items</h5>
      <p className="text-muted small">Items detail Information</p>

      <div className={`card mt-3 p-3 ${styles.cardBody}`}>
        {/* Top Controls */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 px-2 mb-3">
          <div className="position-relative" style={{ maxWidth: '300px' }}>
            <FiSearch
              style={{
                position: 'absolute',
                top: '35%',
                left: '12px',
                transform: 'translateY(-50%)',
                color: '#888',
                fontSize: '1.1rem',
              }}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search Item"
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className="d-flex gap-2 align-items-center">
            <button
              className="btn btn-primary d-flex align-items-center px-3"
              style={{ borderRadius: '8px' }}
              onClick={() => setModalOpen(true)} 
            >
              <FiPlusCircle className="me-2" size={18} />
              Add Item
            </button>

            <button className="btn btn-light border d-flex align-items-center px-3" style={{ borderRadius: '8px' }}>
              <FiFilter className="me-2" size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th><input type="checkbox" /></th>
                <th>Item name</th>
                <th>Image</th>
                <th>id</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td><input type="checkbox" /></td>
                  <td>{item.name}</td>
                  <td><img src={item.img} className={styles.itemImage} alt={item.name} /></td>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.amount}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <div>
            Showing <strong>1 to 10</strong> out of <strong>40</strong> records
          </div>
          <div className="d-flex align-items-center gap-2">
            <select className="form-select form-select-sm" style={{ width: '70px' }}>
              <option>10</option>
              <option>20</option>
            </select>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled"><a className="page-link">‹</a></li>
                <li className="page-item active"><a className="page-link">1</a></li>
                <li className="page-item"><a className="page-link">2</a></li>
                <li className="page-item"><a className="page-link">3</a></li>
                <li className="page-item"><a className="page-link">›</a></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Modal */}
        <AddItemModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default CreateMainContent;
