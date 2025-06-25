import React from 'react';
import styles from './styles.module.css';
import logo from "../../Assets/images/logo.png"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img 
            src={logo} 
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
            <GitHubIcon />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <LinkedInIcon />
          </a>
          <a 
            href="mailto:contact@dsys.dev" 
            className={styles.socialLink}
          >
            <EmailIcon />
          </a>
        </div>
      </div>
      
      <div className={styles.copyright}>
        © 2025 <strong>DilasDev</strong>. Todos os direitos reservados.
      </div>
    </footer>
  );
}