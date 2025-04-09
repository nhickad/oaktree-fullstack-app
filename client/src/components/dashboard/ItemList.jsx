// src/components/dashboard/ItemList.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './dashboard.module.css';

const items = [
  { name: 'Gas Kitting', store: '22 House Store', amount: '1 pcs', img: '/leftPanel.jpg' },
  { name: 'Condet', store: 'HQ Main Store', amount: '3 pcs', img: '/leftPanel.jpg' },
  { name: 'Condet', store: 'HQ Main Store', amount: '5 pcs', img: '/leftPanel.jpg' },
  { name: 'Condet', store: 'HQ Main Store', amount: '5 pcs', img: '/leftPanel.jpg' },
];

const ItemList = () => {
  return (
    <div className="col-md-6 mb-4">
      <div className={`card shadow-sm ${styles.cardBox}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Item List</h5>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>
          <table className="table table-borderless">
            <thead>
              <tr className={styles.tableHeader}>
                <th>Item Name</th>
                <th>Image</th>
                <th>Store</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td><img src={item.img} className={styles.itemImage} alt="item" /></td>
                  <td>{item.store}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
