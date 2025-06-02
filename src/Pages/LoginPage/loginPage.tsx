import React from "react";
import FormLogin from "../../Components/FormLogin/formLogin";
import Footer from "../../Components/Footer/footer";
import styles from "./styles.module.css";

export default function LoginPage() {
  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContent}>
        <FormLogin />
      </div>
      <Footer />
    </div>
  );
}
