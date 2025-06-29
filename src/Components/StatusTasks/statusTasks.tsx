import { Card, Container } from "@mui/material";
import styles from './style.module.css'
import { fetchTasks } from "../../backend/api";
import React, { useEffect, useState } from "react";

type TaskData = {
    concluido: boolean;
};

export default function StatusTasks() {
    const [tasks, setTasks] = useState<TaskData[]>([]);

    useEffect(() => {
        // Função para carregar tasks
        const loadTasks = () => {
            fetchTasks().then((data: TaskData[]) => setTasks(data));
        };

        loadTasks();

        // Listener para atualizar tasks em tempo real
        const handleTasksUpdate = () => {
            loadTasks();
        };

        window.addEventListener('tasksUpdated', handleTasksUpdate);

        return () => {
            window.removeEventListener('tasksUpdated', handleTasksUpdate);
        };
    }, []);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.concluido == true).length || 0;
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