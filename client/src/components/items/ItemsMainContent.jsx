'use client';
import React, { useEffect, useState } from 'react';
import styles from './Items.module.css';
import axios from 'axios';

export default function ItemsMainContent() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort newest to oldest by purchase_date
        const sorted = res.data.sort((a, b) => {
          const idA = parseInt(a.item_id, 10);
          const idB = parseInt(b.item_id, 10);
          return idB - idA; // Descending order: 010 → 001
        });        
        setItems(sorted);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, []);

  const totalPages = Math.ceil(items.length / pageSize);
  const paginatedItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  return (
    <div className={styles.cardWrapper}>
      <h5 className="fw-semibold">All Items</h5>
      <p className="text-muted small">Items detail Information</p>

      <div className={`card mt-3 p-3 ${styles.cardBody}`}>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Item name</th>
                <th>Image</th>
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Price</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
                {paginatedItems.map((item, idx) => (
                  <tr
                    key={idx}
                    onClick={() => window.location.href = `/items/${item.item_id}`}
                    style={{ cursor: 'pointer' }}
                    className="table-row-hover"
                  >
                    <td >{item.name}</td>
                    <td>
                      <img
                        src={item.image || '/leftPanel.jpg'}
                        alt={item.name}
                        className={styles.itemImage}
                        width="40"
                        height="40"
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td>{item.item_id}</td>
                    <td>{item.type}</td>
                    <td>{item.status}</td>
                    <td>{item.price}</td>
                    <td>{formatMonthYear(item.purchase_date)}</td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>

        {items.length > 10 && (
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
            <div>
              Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to <strong>{Math.min(currentPage * pageSize, items.length)}</strong> out of <strong>{items.length}</strong> records
            </div>
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm"
                style={{ width: '70px' }}
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>‹</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>›</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
