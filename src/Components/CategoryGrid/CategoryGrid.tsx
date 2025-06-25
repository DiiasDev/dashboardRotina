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
    const getProgressClass = (percentage: number) => {
        if (percentage <= 30) return styles.progressLow;
        if (percentage <= 70) return styles.progressMedium;
        return styles.progressHigh;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    💰 Gastos por Categoria
                </h2>
                <button className={styles.addButton} onClick={onAddTransaction}>
                    + Adicionar Transação
                </button>
            </div>
            
            <div className={styles.grid}>
                {categories.map((category) => (
                    <div key={category.id} className={styles.categoryCard}>
                        <div className={styles.categoryHeader}>
                            <div className={styles.categoryInfo}>
                                <span className={styles.categoryIcon}>{category.icon}</span>
                                <h4 className={styles.categoryName}>{category.name}</h4>
                            </div>
                        </div>
                        <p className={styles.categoryAmount}>
                            R$ {category.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <div className={styles.progressBar}>
                            <div 
                                className={`${styles.progressFill} ${getProgressClass(category.percentage)}`}
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
