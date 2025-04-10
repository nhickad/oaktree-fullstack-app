'use client';
import React, { useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';
import ItemsMainContent from './ItemsMainContent';
import dashboardStyles from '../dashboard/dashboard.module.css';

const ItemsLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="d-flex position-relative" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      {sidebarOpen && <div className={dashboardStyles.backdrop} onClick={closeSidebar} />}

      <div
        className="flex-grow-1 px-3 py-3"
        style={{
          backgroundColor: '#f7f9fc',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <Header onToggleSidebar={toggleSidebar} />
        <div className="container-fluid mt-4">
          <ItemsMainContent />
        </div>
      </div>
    </div>
  );
};

export default ItemsLayout;
