// components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.scss'; // Додамо стилі пізніше

import {FaEyeSlash,FaEye}  from 'react-icons/fa';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Стан для показу пароля

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Заглушка для API, поки бекенд не готовий
      console.log('Login attempt:', { email, password });
      // Реальний запит до бекенду (розкоментуй, коли API буде готове):
      /*
      const res = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Login failed');
      }
      */
      alert('Login successful!');
      navigate('/'); // Перенаправлення на головну сторінку
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Log into Your Account</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="login-password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.togglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;