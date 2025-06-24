import React from 'react';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img 
            src="/logo-dsys.png" 
            alt="DSYS Logo" 
            className={styles.footerLogo}
          />
          <span className={styles.brandText}>DilasDev</span>
        </div>
        
        <div className={styles.socialLinks}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
          </a>
          <a 
            href="mailto:contact@dsys.dev" 
            className={styles.socialLink}
          >
          </a>
        </div>
      </div>
      
      <div className={styles.copyright}>
        © 2025 <strong>DilasDev</strong>. Todos os direitos reservados.
      </div>
    </footer>
  );
}