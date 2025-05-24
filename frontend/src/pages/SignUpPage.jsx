// pages/SignupPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import styles from './AuthPage.module.scss';

function SignupPage() {
  return (
    <div className={styles.container}>
      <SignupForm />
      <p>
        Already have an account? <span><Link to="/login">Log in</Link></span>
      </p>
    </div>
  );
}

export default SignupPage;