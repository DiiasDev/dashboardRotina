import { Card, Container } from "@mui/material";
import styles from './style.module.css'
import { useState, useEffect } from 'react';

export default function StatusTasks() {
    const [tasksSalvas, setTasksSalvas] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks_criadas") || "[]");
    });

    const updateTasks = () => {
        setTasksSalvas(JSON.parse(localStorage.getItem("tasks_criadas") || "[]"));
    };

    useEffect(() => {
        const onStorageChange = (e: StorageEvent) => {
            if (e.key === 'tasks_criadas') {
                updateTasks();
            }
        };
        window.addEventListener('storage', onStorageChange);

        window.addEventListener('tasksUpdated', updateTasks);

        return () => {
            window.removeEventListener('storage', onStorageChange);
            window.removeEventListener('tasksUpdated', updateTasks);
        };
    }, []);


    const totalTasks = tasksSalvas.length;
    const completedTasks = tasksSalvas.filter((task: { concluido: boolean; }) => task.concluido === true).length || 0;
    const todoTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <Container className={styles.container}>
            <Card className={styles.mainCard}>
                <h4 className={styles.title}>Status das Tasks</h4>
                <div className={styles.statusContainer}>
                    <Card className={`${styles.statusCard} ${styles.completedCard}`}>
                        <span className={styles.statusLabel}>Concluídas</span>
                        <div className={styles.progressContainer}>
                            <div className={`${styles.progressCircle} ${styles.completedProgress}`}>
                                {completionPercentage}%
                            </div>
                            <div className={styles.statusInfo}>
                                <div className={styles.statusCount}>
                                    {completedTasks}/{totalTasks}
                                </div>
                                <span className={styles.statusDescription}>
                                    {completedTasks} tarefas finalizadas
                                </span>
                            </div>
                        </div>
                    </Card>

                    <Card className={`${styles.statusCard} ${styles.todoCard}`}>
                        <span className={styles.statusLabel}>A Fazer</span>
                        <div className={styles.progressContainer}>
                            <div className={`${styles.progressCircle} ${styles.todoProgress}`}>
                                {100 - completionPercentage}%
                            </div>
                            <div className={styles.statusInfo}>
                                <div className={styles.statusCount}>
                                    {todoTasks}/{totalTasks}
                                </div>
                                <span className={styles.statusDescription}>
                                    {todoTasks} tarefas pendentes
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </Card>
        </Container>
    );
}