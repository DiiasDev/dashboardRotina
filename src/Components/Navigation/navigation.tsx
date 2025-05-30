import ToggleTheme from "../ToggleTheme/toggleTheme";
import styles from "./styles.module.css";

export default function Navigation() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Avatar"
            className={styles.avatar}
          />
          <span className={styles.badge}>4</span>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.name}>Samantha</div>
          <div className={styles.email}>samantha@email.com</div>
        </div>
      </div>
      <nav className={styles.menu}>
        <a href="/HomePage" className={styles.navLink}>
          Home
        </a>
        <a href="/tarefas" className={styles.navLink}>
          Adicionar Tarefa
        </a>
        <a href="/graficos" className={styles.navLink}>
          Gráficos
        </a>
        <a href="/objetivos" className={styles.navLink}>
          Objetivos
        </a>
      </nav>
      <div className={styles.themeToggle}>
        <ToggleTheme />
      </div>
    </aside>
  );
}
