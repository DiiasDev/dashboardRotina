import styles from './goalsSection.module.css'

interface Goal {
    id: string
    title: string
    current: number
    target: number
}

interface Report {
    id: string
    icon: string
    title: string
    description: string
}

interface Props {
    goals: Goal[]
    reports: Report[]
}

export default function GoalsSection({ goals, reports }: Props) {
    return (
        <div className={styles.goalsSection}>
            <div className={styles.goalsCard}>
                <h3>Metas Financeiras</h3>
                <div className={styles.goalsList}>
                    {goals.map((goal) => {
                        const percentage = Math.round((goal.current / goal.target) * 100)
                        return (
                            <div key={goal.id} className={styles.goalItem}>
                                <div className={styles.goalInfo}>
                                    <h4>{goal.title}</h4>
                                    <p>R$ {goal.current.toLocaleString('pt-BR')} de R$ {goal.target.toLocaleString('pt-BR')}</p>
                                </div>
                                <div className={styles.goalProgress}>
                                    <div className={styles.goalBar}>
                                        <div className={styles.goalFill} style={{width: `${percentage}%`}}></div>
                                    </div>
                                    <span>{percentage}%</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className={styles.reportsCard}>
                <h3>Relatórios Rápidos</h3>
                <div className={styles.reportsList}>
                    {reports.map((report) => (
                        <div key={report.id} className={styles.reportItem}>
                            <div className={styles.reportIcon}>{report.icon}</div>
                            <div className={styles.reportContent}>
                                <h4>{report.title}</h4>
                                <p>{report.description}</p>
                            </div>
                            <button className={styles.reportButton}>Ver</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
