'use client';
import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import { FaTools, FaExclamationTriangle } from 'react-icons/fa';

const MaintenanceStats = () => {
  const [maintenance, setMaintenance] = useState(0);
  const [damaged, setDamaged] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(data => {
        setMaintenance(data.filter(item => item.status === 'Under Maintenance').length);
        setDamaged(data.filter(item => item.status === 'Damaged').length);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={styles.totalCardWrapper}>
      <div className={styles.totalCard}>
        <h6 className="fw-semibold mb-4">Maintenance Overview</h6>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column align-items-center">
            <FaTools className={styles.iconBlue} />
            <div className="fw-bold fs-5">{maintenance}</div>
            <div className="text-muted small">Under Maintenance</div>
          </div>
          <div className={styles.divider}></div>
          <div className="d-flex flex-column align-items-center">
            <FaExclamationTriangle className={styles.iconPurple} />
            <div className="fw-bold fs-5">{damaged}</div>
            <div className="text-muted small">Damaged Items</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceStats;
