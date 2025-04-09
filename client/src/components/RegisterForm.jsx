import { useState } from 'react';
import styles from './LoginForm.module.css';
import Image from 'next/image';
import logo from '../assets/logo-inventory.png';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/register', {
        name, email, password
      });
      alert("User registered!");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className={styles.bodyPadding}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <img
            src="/leftPanel.jpg"
            alt="Abstract Art"
            className={styles.abstractImage}
          />
        </div>

        <div className={styles.rightPanel}>
          <form onSubmit={handleRegister} className={styles.formBox}>
            <div className={styles.logo}>
              <Image src={logo} alt="Inventory Logo" width={45} height={45} />
              <span className={styles.title}>Inventory</span>
            </div>

            <h2 className={styles.heading}>Create Account ✨</h2>
            <p className={styles.greeting}>Register below to get started</p>

            <input
              className={styles.input}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.input}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button className={styles.button} type="submit">Register</button>

            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <a href="/login" className={styles.backLink}>Return to Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
