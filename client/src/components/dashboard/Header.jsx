'use client';

import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import styles from './dashboard.module.css';

const Header = ({ onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    alert('Logged out');
  };

  return (
    <div className={`${styles.headerWrapper}`}>
      <div className="d-flex justify-content-between align-items-center w-100">
    {/* Left: Hamburger + Greeting */}
    <div className="d-flex align-items-center gap-3 flex-shrink-1">
      <div className={styles.hamburgerBtn} onClick={onToggleSidebar}>
        <FaBars />
      </div>
      <div>
        <h5 className="mb-0 fw-semibold">Hello Mathias 👋🏼</h5>
        <small className="text-muted">Good Morning</small>
      </div>
    </div>

    {/* Right: User */}
    <div className={`position-relative ${styles.accountWrapper}`}>
      <div
        className={`d-flex align-items-center ${styles.userCard}`}
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ cursor: 'pointer' }}
      >
        <FaUserCircle className={styles.userIcon} />
        <div className="ms-2 text-end">
          <div className="fw-semibold">Mathias W.</div>
        </div>
      </div>

      {showDropdown && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownItem} onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
      </div>
    </div>


  );
};

export default Header;
