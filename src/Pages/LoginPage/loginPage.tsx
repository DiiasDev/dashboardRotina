import Footer from "../../Components/Footer/footer";
import FormLogin from "../../Components/FormLogin/formLogin";
import styles from "./styles.module.css";

export default function LoginPage() {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.loginWrapper}>
          <FormLogin />
        </div>
      </main>
      <Footer />
    </>
  );
}
