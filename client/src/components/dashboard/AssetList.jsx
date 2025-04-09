'use client';
import React from 'react';
import styles from './dashboard.module.css';

const assets = [
  { name: 'Gas Kitting', store: '22 House Store', amount: '1 pcs', img: '/leftPanel.jpg' },
  { name: 'Condet', store: 'HQ Main Store', amount: '3 pcs', img: '/leftPanel.jpg' },
  { name: 'Condet', store: 'HQ Main Store', amount: '5 pcs', img: '/leftPanel.jpg' },
  { name: 'Condet', store: 'HQ Main Store', amount: '5 pcs', img: '/leftPanel.jpg' },
];

const AssetList = () => {
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
                  <th>Image</th>
                  <th>Store</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, idx) => (
                  <tr key={idx}>
                    <td>{asset.name}</td>
                    <td>
                      <img src={asset.img} className={styles.itemImage} alt={asset.name} />
                    </td>
                    <td>{asset.store}</td>
                    <td>{asset.amount}</td>
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
