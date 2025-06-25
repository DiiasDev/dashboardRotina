import styles from './summaryCards.module.css'

interface SummaryData {
    income: number
    expenses: number
    balance: number
    savingsProgress: number
    savingsAmount: number
    savingsGoal: number
}

interface Props {
    data: SummaryData
}

export default function SummaryCards({ data }: Props) {
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
        })
    }

    return (
        <div className={styles.summaryContainer}>
            <div className={styles.topCards}>
                <div className={styles.card}>
                    <div className={styles.cardIcon}>💰</div>
                    <div className={styles.cardContent}>
                        <h3>Receita Total</h3>
                        <p className={styles.cardValue}>R$ {formatCurrency(data.income)}</p>
                        <span className={`${styles.cardChange} ${styles.positive}`}>+2,5% este mês</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardIcon}>💸</div>
                    <div className={styles.cardContent}>
                        <h3>Gastos Totais</h3>
                        <p className={styles.cardValue}>R$ {formatCurrency(data.expenses)}</p>
                        <span className={`${styles.cardChange} ${styles.negative}`}>-1,2% este mês</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardIcon}>📊</div>
                    <div className={styles.cardContent}>
                        <h3>Saldo Atual</h3>
                        <p className={styles.cardValue}>R$ {formatCurrency(data.balance)}</p>
                        <span className={`${styles.cardChange} ${data.balance >= 0 ? styles.positive : styles.negative}`}>
                            {data.balance >= 0 ? '+' : ''}8,3% este mês
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.savingsCard}>
                <div className={styles.savingsIcon}>🎯</div>
                <div className={styles.savingsContent}>
                    <h3>Meta de Economia</h3>
                    <div className={styles.savingsValueContainer}>
                        <span className={styles.savingsPercentage}>{data.savingsProgress}%</span>
                        <span className={styles.savingsSubtext}>
                            R$ {formatCurrency(data.savingsAmount)} de R$ {formatCurrency(data.savingsGoal)}
                        </span>
                    </div>
                    <div className={styles.progressBar}>
                        <div 
                            className={styles.progressFill} 
                            style={{ width: `${Math.min(data.savingsProgress, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
