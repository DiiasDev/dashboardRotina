import styles from './categoryGrid.module.css'

interface Category {
    id: string
    icon: string
    name: string
    amount: number
    percentage: number
    categoryKey?: string
}

interface Props {
    categories: Category[]
    onAddTransaction: () => void
}

export default function CategoryGrid({ categories, onAddTransaction }: Props) {
    const getCategoryKey = (name: string) => {
        const categoryMap: { [key: string]: string } = {
            'Moradia': 'moradia',
            'Alimentação': 'alimentacao',
            'Transporte': 'transporte',
            'Lazer': 'lazer',
            'Saúde': 'saude',
            'Vestuário': 'vestuario'
        };
        return categoryMap[name] || 'default';
    };

    return (
        <div className={styles.categoryContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gastos por Categoria</h1>
                <button className={styles.addButton} onClick={onAddTransaction}>
                    + Adicionar Transação
                </button>
            </div>

            <div className={styles.categoryGrid}>
                {categories.map(category => (
                    <div 
                        key={category.id} 
                        className={styles.categoryCard}
                        data-category={category.categoryKey || getCategoryKey(category.name)}
                    >
                        <div className={styles.categoryIcon}>
                            {category.icon}
                        </div>
                        
                        <h3 className={styles.categoryName}>{category.name}</h3>
                        
                        <p className={styles.categoryAmount}>
                            R$ {category.amount.toLocaleString('pt-BR', { 
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2 
                            })}
                        </p>

                        <div className={styles.progressSection}>
                            <span className={styles.progressPercentage}>
                                {category.percentage}% do orçamento
                            </span>
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressFill}
                                    style={{ width: `${Math.min(category.percentage, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
