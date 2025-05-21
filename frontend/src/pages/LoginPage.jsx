// pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import styles from './AuthPage.module.scss';

function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
      <p>
        Don't have an account? <span><Link to="/signup">Sign up</Link></span>
      </p>
    </div>
  );
}

export default LoginPage;