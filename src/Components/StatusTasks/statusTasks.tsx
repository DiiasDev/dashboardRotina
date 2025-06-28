import { Card, Container } from "@mui/material";
import styles from './style.module.css'
import { TaskData } from "../../backend/api";

interface StatusTasksProps {
    filteredTasks?: TaskData[];
}

export default function StatusTasks({ filteredTasks }: StatusTasksProps) {
    const tasksToAnalyze = filteredTasks || [];

    const totalTasks = tasksToAnalyze.length;
    const completedTasks = tasksToAnalyze.filter((task: { concluido: boolean; }) => task.concluido === true).length || 0;
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