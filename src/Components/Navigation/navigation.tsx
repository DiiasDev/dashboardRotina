import { useState, useEffect } from "react";
import ToggleTheme from "../ToggleTheme/toggleTheme";
import styles from "./styles.module.css";
import avatar from '../../Assets/images/gabrielDias.jpg'

export default function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeRoute, setActiveRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const isActive = (route: string) => {
    return activeRoute === route || activeRoute.includes(route);
  };

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
            className={`${styles.navLink} ${isActive('/HomePage') ? styles.active : ''}`}
            onClick={() => setActiveRoute('/HomePage')}
          >
            {!isCollapsed && "🏠 Home"}
          </a>
      
         
          <a 
            href="/Financeiro" 
            className={`${styles.navLink} ${isActive('/Financeiro') ? styles.active : ''}`}
            onClick={() => setActiveRoute('/Financeiro')}
          >
            {!isCollapsed && "💰 Financeiro"}
          </a>

           <a 
            href="/Tasks" 
            className={`${styles.navLink} ${isActive('/Tasks') ? styles.active : ''}`}
            onClick={() => setActiveRoute('/Tasks')}
          >
            {!isCollapsed && "✅ Tasks"}
          </a>

            <a 
            href="/Objetivos" 
            className={`${styles.navLink} ${isActive('/Objetivos') ? styles.active : ''}`}
            onClick={() => setActiveRoute('/Objetivos')}
          >
            {!isCollapsed && "🎯 Objetivos"}
          </a>


          <a 
            href="/Projetos" 
            className={`${styles.navLink} ${isActive('/Projetos') ? styles.active : ''}`}
            onClick={() => setActiveRoute('/Projetos')}
          >
            {!isCollapsed && "📁 Projetos"}
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
