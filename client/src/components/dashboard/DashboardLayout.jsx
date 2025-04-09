import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ItemList from './ItemList';

const DashboardLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3" style={{ backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
        <Header />
        <div className="container-fluid mt-4">
          <div className="row">
            <ItemList />
            {/* Add AssetList here in the same way */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
