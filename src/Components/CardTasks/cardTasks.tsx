import styles from './styles.module.css'

export default function CardTasks(){
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>✅</span>
                <h3 className={styles.cardTitle}>Tasks</h3>
            </div>
            <div className={styles.cardBadges}>
                <span className={styles.cardBadge}>Part-time</span>
                <span className={styles.cardBadge}>Senior level</span>
            </div>
            <span className={styles.cardNumber}>8</span>
            <div className={styles.cardSubtext}>Últimas 30 dias</div>
            <div className={styles.cardFooter}>
                <a className={styles.cardButton} href="/Tarefas">Adicionar Task</a>
            </div>
        </div>
    )
}