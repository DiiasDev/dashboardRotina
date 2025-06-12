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

    // Emoji mapping for categories
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

    const getTaskEmoji = (categoria: string[]) => {
        return categoria.length > 0 ? categoryEmojis[categoria[0]] || '📝' : '📝';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <div className={styles.container}>
            <div className={styles.cardsRow}>
                {tasks.map((task: Task) => (
                    <div
                        className={`${styles.cardTask} ${task.concluido ? styles.completed : ''}`}
                        key={task.id}
                    >
                        <div className={styles.taskContent}>
                            <div className={styles.taskHeader}>
                                <span className={styles.taskEmoji}>{getTaskEmoji(task.categoria)}</span>
                                <div className={styles.taskHeaderContent}>
                                    <h3 className={styles.taskTitle}>{task.titulo}</h3>
                                    <div className={styles.taskCategories}>
                                        {task.categoria.map((cat, index) => (
                                            <span key={index} className={styles.categoryTag}>{cat}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.taskDetails}>
                                <p className={styles.taskDescription}>{task.descricao}</p>
                                <div className={styles.taskMeta}>
                                    <span className={styles.taskDate}>{formatDate(task.dataCreacao)}</span>
                                    <span className={`${styles.taskStatus} ${task.concluido ? styles.statusCompleted : styles.statusPending}`}>
                                        {task.concluido ? 'Concluído' : 'Pendente'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}