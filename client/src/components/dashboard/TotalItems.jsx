'use client';
import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import { FaClipboardList, FaRegFileAlt } from 'react-icons/fa';

const TotalItems = () => {
  const [total, setTotal] = useState(0);
  const [lost, setLost] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(data => {
        setTotal(data.length);
        setLost(data.filter(item => item.status === 'Lost').length);
      });
  }, []);

  return (
    <div className={styles.totalCardWrapper}>
      <div className={styles.totalCard}>
        <h6 className="fw-semibold mb-4">Total Items</h6>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column align-items-center">
            <FaClipboardList className={styles.iconBlue} />
            <div className="fw-bold fs-5">{total}</div>
            <div className="text-muted small">Total Number of Items</div>
          </div>
          <div className={styles.divider}></div>
          <div className="d-flex flex-column align-items-center">
            <FaRegFileAlt className={styles.iconPurple} />
            <div className="fw-bold fs-5">{lost}</div>
            <div className="text-muted small">Lost Items</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalItems;
