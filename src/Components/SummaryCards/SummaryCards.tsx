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
    return (
        <div className={styles.summaryCards}>
            <div className={`${styles.card} ${styles.incomeCard}`}>
                <div className={styles.cardIcon}>💰</div>
                <div className={styles.cardContent}>
                    <h3>Receita Total</h3>
                    <p className={styles.cardValue}>R$ {data.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <span className={styles.cardChange}>+2,5% este mês</span>
                </div>
            </div>

            <div className={`${styles.card} ${styles.expenseCard}`}>
                <div className={styles.cardIcon}>💸</div>
                <div className={styles.cardContent}>
                    <h3>Gastos Totais</h3>
                    <p className={styles.cardValue}>R$ {data.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <span className={styles.cardChange}>-1,2% este mês</span>
                </div>
            </div>

            <div className={`${styles.card} ${styles.balanceCard}`}>
                <div className={styles.cardIcon}>📊</div>
                <div className={styles.cardContent}>
                    <h3>Saldo Atual</h3>
                    <p className={styles.cardValue}>R$ {data.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <span className={styles.cardChange}>+8,3% este mês</span>
                </div>
            </div>

            <div className={`${styles.card} ${styles.savingsCard}`}>
                <div className={styles.cardIcon}>🎯</div>
                <div className={styles.cardContent}>
                    <h3>Meta de Economia</h3>
                    <p className={styles.cardValue}>{data.savingsProgress}%</p>
                    <span className={styles.cardChange}>
                        R$ {data.savingsAmount.toLocaleString('pt-BR')} de R$ {data.savingsGoal.toLocaleString('pt-BR')}
                    </span>
                </div>
            </div>
        </div>
    )
}
