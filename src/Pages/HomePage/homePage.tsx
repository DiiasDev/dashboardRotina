import { useState, useEffect } from "react";
import styles from "./styles.module.css";

export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Listen for sidebar collapse/expand
  useEffect(() => {
    const handleSidebarToggle = (e: Event) => {
      if (e instanceof CustomEvent) {
        setIsSidebarCollapsed(e.detail.collapsed);
      }
    };

    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);

  return (
    <div className={styles.homePageContainer}>
      <main className={`${styles.mainContent} ${isSidebarCollapsed ? styles.collapsedContent : ''}`}>
        <div className={styles.contentWrapper}>
        </div>
      </main>
    </div>
  );
}
