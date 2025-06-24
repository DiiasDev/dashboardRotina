import React from "react";
import FormLogin from "../../Components/FormLogin/formLogin";
import Footer from "../../Components/Footer/footer";
import ThemeToggle from "../../Components/ThemeToggle/ThemeToggle";
import styles from "./styles.module.css";
import logo from "../../Assets/images/logo.png"

export default function LoginPage() {
  return (
    <div className={styles.loginPageContainer}>
      <ThemeToggle />
      <div className={styles.loginContent}>
        <div className={styles.logoContainer}>
          <img 
            src={logo} 
            alt="DSYS Logo" 
            className={styles.logo}
          />
        </div>
        <FormLogin />
      </div>
      <Footer />
    </div>
  );
}
