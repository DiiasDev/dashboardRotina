import { Card, Container, Grid } from "@mui/material";
import styles from './style.module.css'

export default function StatusTasks() {
    const completedTasks = 20;
    const totalTasks = 35;
    const todoTasks = totalTasks - completedTasks;
    const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

    return (
        <Container className={styles.container}>
            <Card className={styles.mainCard}>
                <h4 className={styles.title}>Status das Tasks</h4>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Card className={`${styles.statusCard} ${styles.completedCard}`}>
                            <span className={styles.statusLabel}>Concluídas</span>
                            <div className={`${styles.progressCircle} ${styles.completedProgress}`}>
                                {completionPercentage}%
                            </div>
                            <div className={styles.statusCount}>
                                {completedTasks}/{totalTasks}
                                <span className={styles.percentage}>
                                    {completedTasks} tarefas finalizadas
                                </span>
                            </div>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Card className={`${styles.statusCard} ${styles.todoCard}`}>
                            <span className={styles.statusLabel}>A Fazer</span>
                            <div className={`${styles.progressCircle} ${styles.todoProgress}`}>
                                {100 - completionPercentage}%
                            </div>
                            <div className={styles.statusCount}>
                                {todoTasks}/{totalTasks}
                                <span className={styles.percentage}>
                                    {todoTasks} tarefas pendentes
                                </span>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}