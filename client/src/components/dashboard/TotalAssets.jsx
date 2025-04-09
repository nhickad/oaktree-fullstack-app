'use client';
import React from 'react';
import styles from './dashboard.module.css';
import { FaClipboardList, FaRegFileAlt } from 'react-icons/fa';

const TotalAssets = () => {
  return (
<div className={styles.totalCardWrapper}>
    <div className={styles.totalCard}>
        <h6 className="fw-semibold mb-4">Total assets</h6>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column align-items-center">
            <FaClipboardList className={styles.iconBlue} />
            <div className="fw-bold fs-5">31</div>
            <div className="text-muted small">Total Number of assets</div>
          </div>
          <div className={styles.divider}></div>
          <div className="d-flex flex-column align-items-center">
            <FaRegFileAlt className={styles.iconPurple} />
            <div className="fw-bold fs-5">21</div>
            <div className="text-muted small">To be received</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAssets;
