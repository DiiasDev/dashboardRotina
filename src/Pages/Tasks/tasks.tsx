import { useState, useEffect } from 'react'
import CabecalhoTasks from '../../Components/CabecalhoTasks/cabecalhoTasks'
import TasksComponent from '../../Components/TasksComponent/tasksComponent'
import styles from './styles.module.css'
import ChartComponent from '../../Components/ChartComponent/chatrComponent'
import StatusTasks from '../../Components/StatusTasks/statusTasks'
import type { TaskData } from '../../backend/api';
import { fetchTasks } from '../../backend/api'; // alterado para usar fetchTasks

export default function Tasks() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [allTasks, setAllTasks] = useState<TaskData[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskData[]>([]);
    const [period, setPeriod] = useState<{start: Date|null, end: Date|null}>({start: null, end: null});

    useEffect(() => {
        const handleSidebarToggle = (event: CustomEvent) => {
            setIsSidebarCollapsed(event.detail.collapsed);
        };
 
        window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);

        return () => {
            window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
        };
    }, []);

    useEffect(() => {
        loadTasks();

        const handleTasksUpdate = () => {
            loadTasks();
        };

        window.addEventListener('tasksUpdated', handleTasksUpdate);

        return () => {
            window.removeEventListener('tasksUpdated', handleTasksUpdate);
        };
    }, []);

    const loadTasks = async () => {
        try {
            const tasks: TaskData[] = await fetchTasks();
            setAllTasks(tasks);
            setFilteredTasks(tasks);
        } catch (error) {
            setAllTasks([]);
            setFilteredTasks([]);
        }
    };

    const handleFilterApply = (filteredTasks: TaskData[], start?: Date|null, end?: Date|null) => {
        setFilteredTasks(filteredTasks);
        setPeriod({start: start ?? null, end: end ?? null});
    };

    return (
        <div className={`${styles.pageContainer} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
            <div className={styles.contentCard}>
                <CabecalhoTasks
                    onFilterApply={(filtered, start, end) => handleFilterApply(filtered, start, end)}
                    allTasks={allTasks}
                />
                <div className={`${styles.cardsContainer} ${styles.spacedContainer}`}>
                    <TasksComponent filteredTasks={filteredTasks} />
                </div>
                <div className={styles.chartsContainer}>
                    <ChartComponent tasks={filteredTasks} period={period} />
                    <StatusTasks tasks={filteredTasks} period={period} />
                </div>
            </div>
        </div>
    )
}