'use client';
import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import Link from 'next/link';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`)
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setItems(sorted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="col-md-6 mb-4">
      <div className={`card shadow-sm ${styles.cardBox}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-semibold">Item List</h5>
            <Link href="/items" className={styles.viewAll}>View All</Link>
          </div>

          <div className="table-responsive">
            <table className={`table table-borderless mb-0 ${styles.responsiveTable}`}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th>Item Name</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                  {items.slice(0, 6).map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                      <td>{item.type}</td>
                      <td>₱ {Number(item.price).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
