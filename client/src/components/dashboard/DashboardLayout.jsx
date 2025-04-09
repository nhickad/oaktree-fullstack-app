'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ItemList from './ItemList';
import AssetList from './AssetList';
import styles from './dashboard.module.css';
import TotalItems from './TotalItems';
import TotalAssets from './TotalAssets';
import InStockItems from './InStockItems';
import MaintenanceStats from './MaintenanceStats';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="d-flex position-relative">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Backdrop for mobile */}
      {sidebarOpen && <div className={styles.backdrop} onClick={closeSidebar} />}

      <div
        className="flex-grow-1 px-3 py-3"
        style={{ backgroundColor: '#f7f9fc', minHeight: '100vh' }}
      >
        <Header onToggleSidebar={toggleSidebar} />

        {/* ⬇️ Wrap lists in a row */}
        <div className="container-fluid mt-4">
            <div className="row">
              <ItemList />
              <AssetList />
            </div>

            {/* Total Summary Section */}
            <div className="d-flex flex-wrap justify-content-center gap-4 mt-3">
              <TotalItems />
              <TotalAssets />
              <InStockItems />
              <MaintenanceStats />
            </div>
          </div>


      </div>
    </div>
  );
};

export default DashboardLayout;
