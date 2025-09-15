import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttonGroup}>
          <button type="button" onClick={onBack} className={`${styles.button} ${styles.backButton}`}>
            Back
          </button>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;