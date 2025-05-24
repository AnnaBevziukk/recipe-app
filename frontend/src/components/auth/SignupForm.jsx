// components/auth/SignupForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.scss';
import {FaEyeSlash,FaEye}  from 'react-icons/fa';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Стан для основного пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Стан для підтвердження пароля

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Заглушка для API
      console.log('Signup attempt:', { name, email, password });
      // Реальний запит до бекенду (розкоментуй пізніше):
      /*
      const res = await fetch('http://localhost:8000/api/v1/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Signup failed');
      }
      */
      alert('Signup successful!');
      navigate('/login'); // Перенаправлення на логін
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  return (
    <div className={styles.formContainer}>
      <h2>Create Your Account</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div className={styles.formGroup}>
          <label htmlFor="signup-name">Your name</label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="signup-email">Email address</label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="signup-password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              id="signup-password"
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
        <div className={styles.formGroup}>
          <label htmlFor="signup-confirm">Confirm password</label>
          <div className={styles.passwordWrapper}>
            <input
              id="signup-confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className={styles.togglePassword}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;