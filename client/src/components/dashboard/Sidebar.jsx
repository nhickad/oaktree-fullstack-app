'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './dashboard.module.css';
import {
  FaThLarge,
  FaToolbox,
  FaBoxOpen,
  FaBars,
} from 'react-icons/fa';
import logoInventory from '../../assets/logo-Inventory.png';

const navItems = [
  { label: 'Dashboard', icon: <FaThLarge />, active: true },
  { label: 'Items', icon: <FaBoxOpen /> },
  { label: 'Tools', icon: <FaToolbox /> },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.logoContainer}>
        <Image src={logoInventory} alt="Inventory Logo" className={styles.logoImage} />
        <span className={styles.logoText}>OAKtree Inventory</span>
      </div>

      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.label} className={`${styles.navItem} ${item.active ? styles.activeNav : ''}`}>
            <a
              href="#"
              className={styles.navLink}
              onClick={() => {
                // Close sidebar on mobile nav click
                if (window.innerWidth <= 768) {
                  onClose();
                }
              }}
            >
              <span className={`${styles.icon} ${item.active ? styles.iconActive : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Sidebar;
