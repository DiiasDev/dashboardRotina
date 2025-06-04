import styles from './styles.module.css'

export default function CardLembretes(){
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>🔔</span>
                <h3 className={styles.cardTitle}>Lembretes</h3>
            </div>
            <div className={styles.cardBadges}>
                <span className={styles.cardBadge}>Novo</span>
                <span className={styles.cardBadge}>Importante</span>
            </div>
            <span className={styles.cardNumber}>0</span>
            <div className={styles.cardSubtext}>Últimas 30 dias</div>
            <div className={styles.cardFooter}>
                <a className={styles.cardButton} href="/Lembretes">Ver Todos</a>
            </div>
        </div>
    )
}