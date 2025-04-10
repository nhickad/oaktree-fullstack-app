'use client';
import React, { useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';
import CreateMainContent from './CreateMainContent';
import styles from './Create.module.css';
import { ToastContainer } from 'react-toastify';

const CreateLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="d-flex position-relative" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      {sidebarOpen && <div className={styles.backdrop} onClick={closeSidebar} />}

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
          <CreateMainContent />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreateLayout;
