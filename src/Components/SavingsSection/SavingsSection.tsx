import styles from './savingsSection.module.css'
import { useTheme } from '../../contexts/ThemeContext'

interface Props {
    onAddSavings: () => void
    onRemoveSavings: () => void
}

export default function SavingsSection({ onAddSavings, onRemoveSavings }: Props) {
    const { theme } = useTheme()
    const progressPercentage = 34.5
    const circumference = 2 * Math.PI * 80
    const strokeDasharray = (progressPercentage / 100) * circumference

    return (
        <div className={styles.container} data-theme={theme}>
            <div className={styles.header}>
                <h2 className={styles.title}>💰 Dinheiro Guardado</h2>
                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.addButton}`} onClick={onAddSavings}>
                        + Adicionar
                    </button>
                    <button className={`${styles.button} ${styles.removeButton}`} onClick={onRemoveSavings}>
                        - Retirar
                    </button>
                </div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.cardsContainer}>
                    <div className={styles.card}>
                        <div className={styles.cardIcon}>🏦</div>
                        <div className={styles.cardContent}>
                            <h4 className={styles.cardTitle}>Total Guardado</h4>
                            <p className={styles.cardAmount}>R$ 3.450,00</p>
                            <span className={styles.cardProgress}>+R$ 200,00 este mês</span>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardIcon}>🎯</div>
                        <div className={styles.cardContent}>
                            <h4 className={styles.cardTitle}>Meta Anual</h4>
                            <p className={styles.cardAmount}>R$ 10.000,00</p>
                            <span className={styles.cardProgress}>34,5% atingido</span>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardIcon}>📈</div>
                        <div className={styles.cardContent}>
                            <h4 className={styles.cardTitle}>Média Mensal</h4>
                            <p className={styles.cardAmount}>R$ 287,50</p>
                            <span className={styles.cardProgress}>+R$ 50,00 vs. meta</span>
                        </div>
                    </div>
                </div>

                <div className={styles.chartContainer}>
                    <svg className={styles.progressRing} width="220" height="220">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#4facfe" />
                                <stop offset="100%" stopColor="#00f2fe" />
                            </linearGradient>
                        </defs>
                        <circle
                            className={styles.progressBackground}
                            cx="110"
                            cy="110"
                            r="80"
                        />
                        <circle
                            className={styles.progressBar}
                            cx="110"
                            cy="110"
                            r="80"
                            strokeDasharray={`${strokeDasharray} ${circumference}`}
                        />
                    </svg>
                    <div className={styles.chartCenter}>
                        <p className={styles.chartPercentage}>{progressPercentage}%</p>
                        <p className={styles.chartLabel}>da meta</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
