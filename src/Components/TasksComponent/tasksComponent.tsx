import styles from './styles.module.css'

export default function TasksComponent() {

    const cards = [
        {
            titulo: 'Casa',
            Total: '5/5',
            moreLabel: 'mais',
            emoji: '🏠',
            progress: 100, // 5/5 = 100%
            color: '#4caf50'
        },
        {
            titulo: 'Trabalho',
            Total: '3/5',
            moreLabel: 'mais',
            emoji: '💼',
            progress: 60, // 3/5 = 60%
            color: '#ff9800'
        },
        {
            titulo: 'Faculdade',
            Total: '3/8',
            moreLabel: 'mais',
            emoji: '🎓',
            progress: 37.5, // 3/8 = 37.5%
            color: '#2196f3'
        }
    ]

    return (
        <div className={`${styles.container} ${styles.cardsRow}`}>
            {cards.map((card, index) => (
                <div 
                    className={styles.cardTask} 
                    key={index}
                    style={{borderLeft: `4px solid ${card.color}`}}
                >
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardEmoji}>{card.emoji}</span>
                            <h3 className={styles.cardTitle}>{card.titulo}</h3>
                        </div>
                        <div className={styles.cardProgress}>
                            <div className={styles.progressInfo}>
                                <span>{card.Total}</span>
                                <span className={styles.moreLabel}>{card.moreLabel}</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressFill} 
                                    style={{width: `${card.progress}%`, backgroundColor: card.color}}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}