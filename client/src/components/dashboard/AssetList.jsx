'use client';
import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';

const AssetList = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(item => item.fixed_asset === 1)
          .sort((a, b) => b.id - a.id);
        setAssets(filtered);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="col-md-6 mb-4">
      <div className={`card shadow-sm ${styles.cardBox}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-semibold">Asset List</h5>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>

          <div className="table-responsive">
            <table className={`table table-borderless mb-0 ${styles.responsiveTable}`}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th>Asset Name</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {assets.slice(0, 6).map((asset, idx) => (
                  <tr key={idx}>
                    <td>{asset.name}</td>
                    <td>{asset.status}</td>
                    <td>{asset.type}</td>
                    <td>₱ {Number(asset.price).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetList;
