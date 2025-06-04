import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import CardCabecalho from "../../Components/CardCabecalho/cardCabecalho";
import CardTasks from "../../Components/CardTasks/cardTasks";
import CardLembretes from "../../Components/CardLembretes/cardLembretes";
import CardProjetos from "../../Components/CardProjetos/cardProjetos";

export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
    <div
      className={styles.homePageContainer}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <main className={`${styles.mainContent} ${isSidebarCollapsed ? styles.collapsedContent : ''}`}>
        <div className={styles.contentWrapper}>
          <CardCabecalho />
          <div className={styles.cardsContainer}>
            <CardTasks />
            <CardLembretes />
            <CardProjetos />
          </div>
        </div>
      </main>
    </div>
  );
}
