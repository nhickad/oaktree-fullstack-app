// src/components/dashboard/Sidebar.jsx
import React from 'react';
import styles from './dashboard.module.css';
import { FaThLarge, FaToolbox, FaBoxOpen, FaClipboardList, FaHandHolding, FaClipboardCheck } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className={`d-flex flex-column p-3 ${styles.sidebar}`}>
      <div className="d-flex align-items-center mb-4">
        <img src="/leftPanel.jpg" alt="Logo" className={styles.logoImage} />
        <span className={`fw-bold ms-2 ${styles.logoText}`}>Inventory</span>
      </div>

      <ul className="nav nav-pills flex-column">
        <li className={`nav-item ${styles.activeNav}`}>
          <a href="#" className={`nav-link ${styles.navLink}`}>
            <FaThLarge className="me-2" />
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className={`nav-link ${styles.navLink}`}>
            <FaBoxOpen className="me-2" />
            Items
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className={`nav-link ${styles.navLink}`}>
            <FaToolbox className="me-2" />
            Tools
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className={`nav-link ${styles.navLink}`}>
            <FaClipboardList className="me-2" />
            Assets
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className={`nav-link ${styles.navLink}`}>
            <BsBoxSeam className="me-2" />
            Project
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className={`nav-link ${styles.navLink}`}>
            <FaHandHolding className="me-2" />
            Request
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className={`nav-link ${styles.navLink}`}>
            <FaClipboardCheck className="me-2" />
            On hand
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className={`nav-link ${styles.navLink}`}>
            <FaClipboardList className="me-2" />
            GRN Report
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
