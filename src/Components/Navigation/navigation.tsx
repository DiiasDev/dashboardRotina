import { useState } from "react";
import ToggleTheme from "../ToggleTheme/toggleTheme";
import styles from "./styles.module.css";
import avatar from '../../Assets/images/gabrielDias.jpg'

export default function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);

    // Dispatch custom event for HomePage to listen
    const event = new CustomEvent("sidebarToggle", {
      detail: { collapsed: !isCollapsed },
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""
          }`}
      >
        <div className={styles.profileSection}>
          <div className={styles.avatarWrapper}>
            <img
              src={avatar}
              alt="Avatar"
              className={styles.avatar}
            />
          </div>
          {!isCollapsed && (
            <div className={styles.profileInfo}>
              <div className={styles.name}>Gabriel Dias</div>
              <div className={styles.email}>devpdias@gmail.com</div>
            </div>
          )}
        </div>

        <nav className={styles.menu}>
          <a
            href="/HomePage"
            className={`${styles.navLink} ${styles.active}`}
          >
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="9"
                rx="2"
                fill="currentColor"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="5"
                rx="2"
                fill="currentColor"
              />
              <rect
                x="14"
                y="12"
                width="7"
                height="9"
                rx="2"
                fill="currentColor"
              />
              <rect
                x="3"
                y="16"
                width="7"
                height="5"
                rx="2"
                fill="currentColor"
              />
            </svg>
            {!isCollapsed && "Home"}
          </a>
          <a href="/tarefas" className={styles.navLink}>
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
                fill="currentColor"
              />
            </svg>
            {!isCollapsed && "Adicionar Tarefa"}
          </a>
          <a href="/graficos" className={styles.navLink}>
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
                fill="currentColor"
              />
            </svg>
            {!isCollapsed && "Gráficos"}
          </a>
          <a href="/objetivos" className={styles.navLink}>
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                fill="currentColor"
              />
            </svg>
            {!isCollapsed && "Objetivos"}
          </a>
        </nav>

        {!isCollapsed && (
          <div className={styles.themeToggle}>
            <ToggleTheme />
          </div>
        )}

        <button
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isCollapsed ? (
              <path
                d="M8 4L16 12L8 20"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M16 4L8 12L16 20"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </aside>
    </>
  );
}
