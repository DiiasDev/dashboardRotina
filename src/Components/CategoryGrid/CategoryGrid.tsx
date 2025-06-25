import styles from './CategoryGrid.module.css'

interface Category {
    id: string
    icon: string
    name: string
    amount: number
    percentage: number
}

interface Props {
    categories: Category[]
    onAddTransaction: () => void
}

export default function CategoryGrid({ categories, onAddTransaction }: Props) {
    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2>Gastos por Categoria</h2>
                <button className={styles.addButton} onClick={onAddTransaction}>
                    + Adicionar Transação
                </button>
            </div>
            
            <div className={styles.categoryGrid}>
                {categories.map((category) => (
                    <div key={category.id} className={styles.categoryCard}>
                        <div className={styles.categoryIcon}>{category.icon}</div>
                        <h4>{category.name}</h4>
                        <p className={styles.categoryAmount}>
                            R$ {category.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <div className={styles.progressBar}>
                            <div 
                                className={styles.progressFill} 
                                style={{width: `${category.percentage}%`}}
                            ></div>
                        </div>
                        <span className={styles.categoryPercent}>{category.percentage}% do orçamento</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
