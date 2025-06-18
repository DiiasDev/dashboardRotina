import styles from './styles.module.css'
import { Tasks, TaskData } from '../../logic/tasks';
import { useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import DetalhesTask from '../modals/DetalhesTask/detalhesTask';

interface Task {
    id: number;
    titulo: string;
    categoria: string[];
    descricao: string;
    concluido: boolean;
    dataCreacao: string;
}

export default function TasksComponent() {
    const [tasksSalvas, setTasks] = useState<TaskData[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

    const taskManeger = new Tasks(0, "", [], "", false, "")

    //realtime 
    useEffect(() => {
        carregarTasks();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'tasks_criadas') {
                carregarTasks();
            }
        };

        const handleTasksUpdate = () => {
            carregarTasks();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('tasksUpdated', handleTasksUpdate);

        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('tasksUpdated', handleTasksUpdate);
        };
    }, []);

    const carregarTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks_criadas") || "[]")
        setTasks(savedTasks)
    }

    const excluirTask = (id: number) => {
        const tasksAtualizadas = tasksSalvas.filter((task => task.id !== id))

        localStorage.setItem("tasks_criadas", JSON.stringify(tasksAtualizadas))
        setTasks(tasksAtualizadas)
        
        window.dispatchEvent(new CustomEvent('tasksUpdated'));
    }

    const exibeDetalhes = (id: number) => {
        const taskSelecionada = tasksSalvas.find((task) => task.id === id);
        if (taskSelecionada) {
            setSelectedTask(taskSelecionada);
            setModalOpen(true);
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedTask(null);
    }

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

    const handleConcluirTask = (id: number) => {
        const tasksAtualizadas = tasksSalvas.map((task) => task.id === id ? { ...task, concluido: true } : task);

        setTasks(tasksAtualizadas);
        localStorage.setItem("tasks_criadas", JSON.stringify(tasksAtualizadas))
        
        window.dispatchEvent(new CustomEvent('tasksUpdated'));
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const groupTasksByCategory = (): { [key: string]: Task[] } => {
        return groupBy(tasksSalvas, (task: Task) => task.categoria[0] || 'Outros') as { [key: string]: Task[] };
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
                                            <div className={styles.taskHeader}>
                                                <h4 className={styles.taskItemTitle}>{task.titulo}</h4>
                                                <div className={styles.taskActions}>
                                                    <button
                                                        className={styles.viewMoreButton}
                                                        title="Ver mais detalhes"
                                                        onClick={() => exibeDetalhes(task.id)}
                                                    >
                                                        👁️
                                                    </button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        title="Remover task"
                                                        onClick={() => excluirTask(task.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                            <p className={styles.taskItemDescription}>{task.descricao}</p>
                                            <button
                                                className={styles.concludeButton}
                                                onClick={() => handleConcluirTask(task.id)}
                                                disabled={task.concluido}
                                            >
                                                {task.concluido ? 'Concluída' : 'Concluir'}
                                            </button>
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
            <DetalhesTask 
                open={modalOpen}
                onClose={handleCloseModal}
                taskData={selectedTask}
            />
        </div>
    )
}