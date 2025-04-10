'use client';
import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import { FaClipboardList, FaRegFileAlt } from 'react-icons/fa';

const InStockItems = () => {
  const [inStock, setInStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`)
      .then(res => res.json())
      .then(data => {
        setInStock(data.filter(item => item.status === 'In Stock').length);
        setOutOfStock(data.filter(item => item.status === 'Out of Stock').length);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={styles.totalCardWrapper}>
      <div className={styles.totalCard}>
        <h6 className="fw-semibold mb-4">Stock Availability</h6>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column align-items-center">
            <FaClipboardList className={styles.iconBlue} />
            <div className="fw-bold fs-5">{inStock}</div>
            <div className="text-muted small">In Stock Items</div>
          </div>
          <div className={styles.divider}></div>
          <div className="d-flex flex-column align-items-center">
            <FaRegFileAlt className={styles.iconPurple} />
            <div className="fw-bold fs-5">{outOfStock}</div>
            <div className="text-muted small">Out of Stock</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InStockItems;
