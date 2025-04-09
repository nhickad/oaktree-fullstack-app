// src/components/dashboard/Header.jsx
import React from 'react';
import styles from './dashboard.module.css';
import { FaBell } from 'react-icons/fa';

const Header = () => {
  return (
    <div className={`d-flex justify-content-between align-items-center ${styles.headerContainer}`}>
      <div>
        <h5 className="mb-0 fw-semibold">Hello Mathias 👋🏼</h5>
        <small className="text-muted">Good Morning</small>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className="input-group" style={{ maxWidth: '250px' }}>
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search"
          />
        </div>
        <div className={`${styles.iconButton}`}>
          <FaBell />
        </div>
        <div className={`d-flex align-items-center ${styles.userCard}`}>
          <img src="/leftPanel.jpg" alt="user" className={styles.userImage} />
          <div className="ms-2">
            <div className="fw-semibold">Mathias W.</div>
            <small className="text-muted">Store Manager</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
