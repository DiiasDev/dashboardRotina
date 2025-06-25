import styles from './chartsSection.module.css'

interface Transaction {
    id: string
    icon: string
    name: string
    date: string
    amount: number
    isIncome?: boolean
}

interface Props {
    transactions: Transaction[]
}

export default function ChartsSection({ transactions }: Props) {
    return (
        <div className={styles.chartsSection}>
            <div className={styles.chartCard}>
                <h3>Evolução Mensal</h3>
                <div className={styles.chartPlaceholder}>
                    <div className={styles.chartBars}>
                        <div className={styles.bar} style={{height: '60%'}}><span>Jan</span></div>
                        <div className={styles.bar} style={{height: '75%'}}><span>Fev</span></div>
                        <div className={styles.bar} style={{height: '45%'}}><span>Mar</span></div>
                        <div className={styles.bar} style={{height: '80%'}}><span>Abr</span></div>
                        <div className={styles.bar} style={{height: '90%'}}><span>Mai</span></div>
                        <div className={styles.bar} style={{height: '85%'}}><span>Jun</span></div>
                    </div>
                </div>
            </div>

            <div className={styles.transactionsCard}>
                <h3>Transações Recentes</h3>
                <div className={styles.transactionsList}>
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className={styles.transaction}>
                            <div className={styles.transactionIcon}>{transaction.icon}</div>
                            <div className={styles.transactionDetails}>
                                <p className={styles.transactionName}>{transaction.name}</p>
                                <span className={styles.transactionDate}>{transaction.date}</span>
                            </div>
                            <span className={`${styles.transactionAmount} ${transaction.isIncome ? styles.income : styles.expense}`}>
                                {transaction.isIncome ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
