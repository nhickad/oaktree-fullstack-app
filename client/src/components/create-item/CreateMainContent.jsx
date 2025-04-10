'use client';
import React, { useEffect, useState } from 'react';
import styles from './Create.module.css';
import AddItemModal from './AddItemModal';
import { FiSearch, FiPlusCircle, FiFilter } from 'react-icons/fi';
import axios from 'axios';

const CreateMainContent = () => {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sorted = res.data.sort((a, b) => {
          const idA = parseInt(a.item_id, 10);
          const idB = parseInt(b.item_id, 10);
          return idB - idA;
        });

        setItems(sorted);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const keywordMatch =
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.type.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.item_id.toLowerCase().includes(searchKeyword.toLowerCase());

    const statusMatch = statusFilter ? item.status === statusFilter : true;
    const typeMatch = typeFilter ? item.type === typeFilter : true;

    return keywordMatch && statusMatch && typeMatch;
  });

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.cardWrapper}>
      <h5 className="fw-semibold">Create Items</h5>
      <p className="text-muted small">Items detail Information</p>

      <div className={`card mt-3 p-3 ${styles.cardBody}`}>
        {/* Top Controls */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 px-2 mb-3">
          <div className="position-relative" style={{ maxWidth: '300px' }}>
            <FiSearch
              style={{
                position: 'absolute',
                top: '35%',
                left: '12px',
                transform: 'translateY(-50%)',
                color: '#888',
                fontSize: '1.1rem',
              }}
            />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setCurrentPage(1);
              }}
              className="form-control ps-5"
              placeholder="Search Item"
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className="d-flex gap-2 align-items-center">
            <button
              className="btn btn-primary d-flex align-items-center px-3"
              style={{ borderRadius: '8px' }}
              onClick={() => setModalOpen(true)}
            >
              <FiPlusCircle className="me-2" size={18} />
              Add Item
            </button>

            <button
              className="btn btn-light border d-flex align-items-center px-3"
              style={{ borderRadius: '8px' }}
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <FiFilter className="me-2" size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Filter Dropdown */}
        {showFilters && (
          <div className="d-flex gap-3 mb-3 flex-wrap px-2">
            <div>
              <label className="form-label small mb-1">Filter by Status</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All</option>
                <option value="In Use">In Use</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Disposed">Disposed</option>
              </select>
            </div>

            <div>
              <label className="form-label small mb-1">Filter by Type</label>
              <select
                className="form-select"
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Equipment">Equipment</option>
                <option value="Software Licenses">Software Licenses</option>
                <option value="IE Project Items">IE Project Items</option>
              </select>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Item name</th>
                <th>Image</th>
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Price</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() => window.location.href = `/items/${item.item_id}`}
                  style={{ cursor: 'pointer' }}
                  className="table-row-hover"
                >
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.image || '/leftPanel.jpg'}
                      className={styles.itemImage}
                      alt={item.name}
                      width="40"
                      height="40"
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td>{item.item_id}</td>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
                  <td>{item.price}</td>
                  <td>{new Date(item.purchase_date).toLocaleString('default', { month: 'long', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        {filteredItems.length > 10 && (
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
            <div>
              Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to{' '}
              <strong>{Math.min(currentPage * pageSize, filteredItems.length)}</strong> out of{' '}
              <strong>{filteredItems.length}</strong> records
            </div>
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm"
                style={{ width: '70px' }}
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>‹</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>›</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Modal */}
        <AddItemModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default CreateMainContent;
