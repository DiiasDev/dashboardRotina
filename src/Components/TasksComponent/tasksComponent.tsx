import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import DetalhesTask from '../modals/DetalhesTask/detalhesTask';
import { fetchTasks, TaskData, deleteTask, createTask, concluirTask } from '../../backend/api';

// Ajuste a interface para refletir o formato do banco
type Task = TaskData;

interface TasksComponentProps {
    filteredTasks?: Task[];
}

export default function TasksComponent({ filteredTasks }: TasksComponentProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const carregarTasks = () => {
            fetchTasks()
                .then((data) => {
                    const mapped = data.map((task: any) => ({
                        ...task,
                        categoria: Array.isArray(task.categoria) ? task.categoria[0] : task.categoria,
                        concluido: !!task.concluido,
                        data_criacao: task.data_criacao || task.dataCreacao,
                        descricao: task.descricao || '',
                        titulo: task.titulo || '',
                        id: task.id,
                    }));
                    setTasks(mapped);
                })
                .catch((err) => {
                    setTasks([]);
                    console.error("Erro ao carregar tasks:", err);
                });
        };

        carregarTasks();

        const handleTasksUpdated = () => {
            carregarTasks();
        };

        // Novo handler para adicionar task imediatamente
        const handleTaskCreated = (event: Event) => {
            const customEvent = event as CustomEvent;
            const newTask = customEvent.detail;
            if (newTask) {
                setTasks(prevTasks => [
                    {
                        ...newTask,
                        categoria: Array.isArray(newTask.categoria) ? newTask.categoria[0] : newTask.categoria,
                        concluido: !!newTask.concluido,
                        data_criacao: newTask.data_criacao || newTask.dataCreacao,
                        descricao: newTask.descricao || '',
                        titulo: newTask.titulo || '',
                        id: newTask.id,
                    },
                    ...prevTasks
                ]);
            }
        };

        window.addEventListener('tasksUpdated', handleTasksUpdated);
        window.addEventListener('taskUpdated', handleTaskCreated);

        return () => {
            window.removeEventListener('tasksUpdated', handleTasksUpdated);
            window.removeEventListener('taskUpdated', handleTaskCreated);
        };
    }, []);

    const rawTasksToDisplay =
        filteredTasks && filteredTasks.length > 0 ? filteredTasks : tasks;


    const tasksToDisplay = rawTasksToDisplay.map((task: any) => ({
        ...task,
        categoria: Array.isArray(task.categoria) ? task.categoria[0] : task.categoria,
        concluido: !!task.concluido,
        data_criacao: task.data_criacao || task.dataCreacao,
        descricao: task.descricao || '',
        titulo: task.titulo || '',
        id: task.id,
    }));

    const handleCreateTask = async (novaTask: Task) => {
        try {
            await createTask(novaTask);
            window.dispatchEvent(new CustomEvent('tasksUpdated'));
            // Limpe o formulário ou feche o modal se necessário
        } catch (err) {
            // Trate o erro
        }
    };

    const excluirTask = (id: number) => {
        deleteTask(id)
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
                window.dispatchEvent(new CustomEvent('tasksUpdated'));
            })
            .catch((error) => {
                console.error(`Erro ao excluir task ${id}:`, error);
            });
    }

    const exibeDetalhes = (id: number) => {
        const taskSelecionada = tasksToDisplay.find((task) => task.id === id);
        if (taskSelecionada) {
            setSelectedTask(taskSelecionada);
            setModalOpen(true);
        }
    }

    const handleConcluirTask = async (id: number) => {
        try {
            const updatedTask = await concluirTask(id);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id
                        ? { ...task, concluido: true, data_conclusao: updatedTask.data_conclusao }
                        : task
                )
            );
            window.dispatchEvent(new CustomEvent('tasksUpdated'));
        } catch (error) {
            console.error(`Erro ao concluir task ${id}:`, error);
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
        'Faculdade': '🎓',
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

    const groupTasksByCategory = (): { [key: string]: Task[] } => {
        return groupBy(tasksToDisplay, (task: Task) => task.categoria || 'Outros') as { [key: string]: Task[] };
    };

    const groupedTasks = groupTasksByCategory();

    return (
        <div className={styles.container}>
            <div className={styles.cardsRow}>
                {tasksToDisplay.length === 0 && (
                    <div style={{ color: 'red', padding: 16 }}>
                        Nenhuma task encontrada.
                    </div>
                )}
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
                                                <span className={styles.taskItemDate}>{formatDate(task.data_criacao)}</span>
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
                taskData={
                    selectedTask
                        ? {
                            ...selectedTask,
                            categoria: Array.isArray(selectedTask.categoria) ? selectedTask.categoria : [selectedTask.categoria],
                            dataCreacao: (selectedTask as any).dataCreacao ?? selectedTask.data_criacao
                        }
                        : null
                }
            />
        </div>
    )
}