import styles from './savingsSection.module.css'
import { useTheme } from '../../contexts/ThemeContext'

interface Props {
    onAddSavings: () => void
    onRemoveSavings: () => void
}

export default function SavingsSection({ onAddSavings, onRemoveSavings }: Props) {
    const { theme } = useTheme()

    return (
        <div className={styles.section} data-theme={theme}>
            <div className={styles.sectionHeader}>
                <h2>💰 Dinheiro Guardado</h2>
                <div className={styles.savingsActions}>
                    <button className={styles.addButton} onClick={onAddSavings}>
                        + Adicionar
                    </button>
                    <button className={styles.removeButton} onClick={onRemoveSavings}>
                        - Retirar
                    </button>
                </div>
            </div>
            
            <div className={styles.savingsOverview}>
                <div className={styles.savingsCard}>
                    <div className={styles.savingsIcon}>🏦</div>
                    <div className={styles.savingsContent}>
                        <h3>Total Guardado</h3>
                        <p className={styles.savingsValue}>R$ 3.450,00</p>
                        <span className={styles.savingsChange}>+R$ 200,00 este mês</span>
                    </div>
                </div>

                <div className={styles.savingsCard}>
                    <div className={styles.savingsIcon}>🎯</div>
                    <div className={styles.savingsContent}>
                        <h3>Meta Anual</h3>
                        <p className={styles.savingsValue}>R$ 10.000,00</p>
                        <span className={styles.savingsProgress}>34,5% atingido</span>
                    </div>
                </div>

                <div className={styles.savingsCard}>
                    <div className={styles.savingsIcon}>📈</div>
                    <div className={styles.savingsContent}>
                        <h3>Média Mensal</h3>
                        <p className={styles.savingsValue}>R$ 287,50</p>
                        <span className={styles.savingsChange}>+R$ 50,00 vs. meta</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
