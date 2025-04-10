'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUserCircle, FaBars, FaSignOutAlt } from 'react-icons/fa'; 
import styles from './dashboard.module.css';
import axios from 'axios';

const Header = ({ onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/protected`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fullName = res.data.name || 'User';
        const nameParts = fullName.trim().split(' ');

        setFirstName(nameParts[0]);
        setDisplayName(`${nameParts[0]} ${nameParts[1] || ''}`.trim()); // handle optional second word
      } catch (err) {
        console.error("Token invalid:", err);
        router.replace('/login');
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className={styles.headerWrapper}>
      <div className="d-flex justify-content-between align-items-center w-100">
        {/* 👋 Greeting */}
        <div className="d-flex align-items-center gap-3 flex-shrink-1">
          <div className={styles.hamburgerBtn} onClick={onToggleSidebar}>
            <FaBars />
          </div>
          <div>
            <h5 className="mb-0 fw-semibold">Hello {firstName} 👋🏼</h5>
            <small className="text-muted">Good Day</small>
          </div>
        </div>

        {/* 👤 User Info */}
        <div className={`position-relative ${styles.accountWrapper}`}>
          <div
            className={`d-flex align-items-center ${styles.userCard}`}
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ cursor: 'pointer' }}
          >
            <FaUserCircle className={styles.userIcon} />
            <div className="ms-2 text-end">
              <div className="fw-semibold">{displayName}</div>
            </div>
          </div>

          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownItem} onClick={handleLogout}>
                <FaSignOutAlt size={16} />
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
