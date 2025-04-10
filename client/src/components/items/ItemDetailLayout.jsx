'use client';
import React, { useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';
import styles from '../../components/items/Items.module.css'; // uses headerWrapper & mainContent

export default function ItemDetailLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="d-flex position-relative" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      {sidebarOpen && <div className={styles.backdrop} onClick={closeSidebar} />}

      <div
        className={`flex-grow-1 ${styles.mainContent}`}
        style={{ backgroundColor: '#f7f9fc', height: '100vh', overflowY: 'auto' }}
      >
        <div className={styles.headerWrapper}>
          <Header onToggleSidebar={toggleSidebar} />
        </div>

        {children}
      </div>
    </div>
  );
}
