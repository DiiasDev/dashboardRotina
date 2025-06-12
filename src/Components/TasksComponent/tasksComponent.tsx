import styles from './styles.module.css'

interface Task {
    id: number;
    titulo: string;
    categoria: string[];
    descricao: string;
    concluido: boolean;
    dataCreacao: string;
}

export default function TasksComponent() {
    const tasks = JSON.parse(localStorage.getItem('tasks_criadas') || '[]')

    const categoryEmojis: { [key: string]: string } = {
        'Casa': '🏠',
        'Trabalho': '💼',
        'Estudos': '📚',
        'Saúde': '🏥',
        'Exercício': '💪',
        'Lazer': '🎮',
        'Compras': '🛒',
        'Viagem': '✈️',
        'Família': '👨‍👩‍👧‍👦',
        'Amigos': '👥'
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const groupTasksByCategory = () => {
        const grouped: { [key: string]: Task[] } = {};
        
        tasks.forEach((task: Task) => {
            const primaryCategory = task.categoria[0] || 'Outros';
            if (!grouped[primaryCategory]) {
                grouped[primaryCategory] = [];
            }
            grouped[primaryCategory].push(task);
        });
        
        return grouped;
    };

    const groupedTasks = groupTasksByCategory();

    return (
        <div className={styles.container}>
            <div className={styles.cardsRow}>
                {Object.entries(groupedTasks).map(([category, categoryTasks]) => {
                    const completedTasks = categoryTasks.filter(task => task.concluido).length;
                    const totalTasks = categoryTasks.length;
                    const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

                    return (
                        <div className={styles.categoryCard} key={category}>
                            <div className={styles.categoryHeader}>
                                <span className={styles.categoryEmoji}>
                                    {categoryEmojis[category] || '📝'}
                                </span>
                                <div className={styles.categoryInfo}>
                                    <h3 className={styles.categoryTitle}>{category}</h3>
                                    <div className={styles.categoryStats}>
                                        <span className={styles.taskCount}>{totalTasks} task{totalTasks !== 1 ? 's' : ''}</span>
                                        <span className={styles.completionRate}>{completionPercentage}% concluído</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.tasksList}>
                                {categoryTasks.slice(0, 3).map((task: Task) => (
                                    <div 
                                        key={task.id} 
                                        className={`${styles.taskItem} ${task.concluido ? styles.completed : ''}`}
                                    >
                                        <div className={styles.taskItemContent}>
                                            <h4 className={styles.taskItemTitle}>{task.titulo}</h4>
                                            <p className={styles.taskItemDescription}>{task.descricao}</p>
                                            <div className={styles.taskItemMeta}>
                                                <span className={styles.taskItemDate}>{formatDate(task.dataCreacao)}</span>
                                                <span className={`${styles.taskStatus} ${task.concluido ? styles.statusCompleted : styles.statusPending}`}>
                                                    {task.concluido ? 'Concluído' : 'Pendente'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {categoryTasks.length > 3 && (
                                    <div className={styles.moreTasksIndicator}>
                                        +{categoryTasks.length - 3} mais task{categoryTasks.length - 3 !== 1 ? 's' : ''}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}