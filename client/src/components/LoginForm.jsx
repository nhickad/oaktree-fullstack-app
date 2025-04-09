import { useState } from 'react';
import styles from './LoginForm.module.css';
import Image from 'next/image';
import logo from '../assets/logo-inventory.png';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


import axios from 'axios';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const router = useRouter(); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (!username || !password) {
  //     setError("All fields required");
  //     return;
  //   }
  //   try {
  //     const res = await axios.post('http://localhost:5000/login', {
  //       username, password
  //     });
  //     localStorage.setItem('token', res.data.token);
  //     alert("Logged in!");
  //   } catch (err) {
  //     setError("Login failed");
  //   }
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("All fields required");
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      console.log("Login response:", res.data); // 👈 Add this
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed");
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
        <form onSubmit={handleLogin} className={styles.formBox}>
          <div className={styles.logo}>
            <Image src={logo} alt="Inventory Logo" width={45} height={45} />
            <span className={styles.title}>Oaktree Inventory</span>
          </div>

          <h2 className={styles.heading}>Welcome 👋</h2>
          <p className={styles.greeting}>Please login here</p>

          <input
            className={styles.input}
            type="text"
            placeholder="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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


          <div className={styles.linkRow}>
          <a href="/register" className={styles.registerLink}>Register User</a>
          <a href="#" className={styles.forgotLink}>Forgot Password?</a>
          </div>


          <button className={styles.button} type="submit">Login</button>

          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        </form>
      </div>
    </div>    
  </div>

  );
}
