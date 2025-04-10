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
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', icon: <FaThLarge />, path: '/dashboard' },
  { label: 'Items', icon: <FaBoxOpen />, path: '/items' },
  { label: 'Create Item', icon: <FaToolbox />, path: '/create-item' }, 
];

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname(); // 👈 Get current route

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.logoContainer}>
        <Image src={logoInventory} alt="Inventory Logo" className={styles.logoImage} />
        <span className={styles.logoText}>OAKtree Inventory</span>
      </div>

      <ul className={styles.navList}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <li
              key={item.label}
              className={`${styles.navItem} ${isActive ? styles.activeNav : ''}`}
              onClick={() => {
                if (window.innerWidth <= 768) onClose();
              }}
            >
              <Link href={item.path} className={styles.navLink}>
                <span className={`${styles.icon} ${isActive ? styles.iconActive : ''}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>

          );
        })}
      </ul>
    </div>
  );
};



export default Sidebar;
