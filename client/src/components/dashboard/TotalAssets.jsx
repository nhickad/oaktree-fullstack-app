'use client';
import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import { FaClipboardList, FaRegFileAlt } from 'react-icons/fa';

const TotalAssets = () => {
  const [total, setTotal] = useState(0);
  const [disposed, setDisposed] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`)
      .then(res => res.json())
      .then(data => {
        const assets = data.filter(item => item.fixed_asset === 1);
        setTotal(assets.length);
        setDisposed(assets.filter(a => a.status === 'Disposed').length);
      });
  }, []);

  return (
    <div className={styles.totalCardWrapper}>
      <div className={styles.totalCard}>
        <h6 className="fw-semibold mb-4">Total assets</h6>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column align-items-center">
            <FaClipboardList className={styles.iconBlue} />
            <div className="fw-bold fs-5">{total}</div>
            <div className="text-muted small">Total Assets</div>
          </div>
          <div className={styles.divider}></div>
          <div className="d-flex flex-column align-items-center">
            <FaRegFileAlt className={styles.iconPurple} />
            <div className="fw-bold fs-5">{disposed}</div>
            <div className="text-muted small">Disposed Assets</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAssets;
