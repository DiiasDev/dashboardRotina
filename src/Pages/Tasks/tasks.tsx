import { useState, useEffect } from 'react'
import CabecalhoTasks from '../../Components/CabecalhoTasks/cabecalhoTasks'
import TasksComponent from '../../Components/TasksComponent/tasksComponent';
import styles from './styles.module.css'
import ChartComponent from '../../Components/ChartComponent/chatrComponent';
import StatusTasks from '../../Components/StatusTasks/statusTasks';

export default function Tasks() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        const handleSidebarToggle = (event: CustomEvent) => {
            setIsSidebarCollapsed(event.detail.collapsed);
        };

        window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);

        return () => {
            window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
        };
    }, []);

    return (
        <div className={`${styles.pageContainer} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
            <div className={styles.contentCard}>
                <CabecalhoTasks />
                <div className={`${styles.cardsContainer} ${styles.spacedContainer}`}>
                    <TasksComponent />
                </div>
                <div className={styles.chartsContainer}>
                    <div className={`${styles.chartItem} ${styles.chartMain}`}>
                        <ChartComponent />
                    </div>
                    <div className={`${styles.chartItem} ${styles.chartSide}`}>
                        <StatusTasks />
                    </div>
                </div>
            </div>
        </div>
    )
}