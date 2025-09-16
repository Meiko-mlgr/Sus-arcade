import React from 'react';
import styles from './Footer.module.css';
import { GithubIcon, LinkedinIcon } from './game-icons'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>&copy; 2025 Mikko Melgar</span>
        <div className={styles.links}>
          <a href="https://github.com/Meiko-mlgr" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <GithubIcon />
          </a>
          <a href="https://www.linkedin.com/in/mikko-melgar-447069233" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;