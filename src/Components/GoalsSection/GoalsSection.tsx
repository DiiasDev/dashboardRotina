import styles from './goalsSection.module.css'

interface Goal {
    id: string
    title: string
    current: number
    target: number
    color: string
    percentage: number
    description: string
}

interface Report {
    id: string
    icon: string
    title: string
    description: string
}

interface GoalsSectionProps {
    goals: Goal[]
    reports: Report[]
}

export default function GoalsSection({ goals, reports }: GoalsSectionProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.goalsCard}>
                <h2 className={styles.title}>Metas Financeiras</h2>
                <div className={styles.goalsList}>
                    {goals.map((goal) => (
                        <div key={goal.id} className={styles.goalItem}>
                            <div className={styles.goalHeader}>
                                <h3 className={styles.goalTitle}>{goal.title}</h3>
                                <span className={styles.percentage}>{goal.percentage}%</span>
                            </div>
                            <div className={styles.goalDescription}>
                                {formatCurrency(goal.current)} de {formatCurrency(goal.target)}
                            </div>
                            <div className={styles.progressBarContainer}>
                                <div 
                                    className={styles.progressBar}
                                    style={{ 
                                        width: `${goal.percentage}%`,
                                        backgroundColor: goal.color 
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.reportsCard}>
                <h2 className={styles.title}>Relatórios</h2>
                <div className={styles.reportsList}>
                    {reports.map((report) => (
                        <div key={report.id} className={styles.reportItem}>
                            <span className={styles.reportIcon}>{report.icon}</span>
                            <div className={styles.reportContent}>
                                <h3 className={styles.reportTitle}>{report.title}</h3>
                                <p className={styles.reportDescription}>{report.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
