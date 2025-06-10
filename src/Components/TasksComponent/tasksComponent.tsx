import styles from './styles.module.css'

interface Task {
    emoji: string;
    title: string;
    moreLabel: string;
    progress: number;
    color: string;
    Total: string;
    categoria: string;
    descricao: string;
}

export default function TasksComponent() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')

    return (
        <div className={`${styles.container} ${styles.cardsRow}`}>
            {tasks.map((task: Task, index: number) => (
                <div
                    className={styles.cardTask}
                    key={index}
                    style={{ borderLeft: `4px solid ${task.color}` }}
                >
                    <div className={styles.taskContent}>
                        <div className={styles.taskHeader}>
                            <span className={styles.taskEmoji}>{task.emoji}</span>
                            <h3 className={styles.taskTitle}>{task.title}</h3>
                        </div>
                        <div className={styles.taskProgress}>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${task.progress}%`, backgroundColor: task.color }}
                                ></div>
                                <div className={styles.progressInfo}>
                                    <span>{task.Total}</span>
                                    <span className={styles.moreLabel}>{task.moreLabel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}