import { useState, useEffect } from 'react'
import CabecalhoTasks from '../../Components/CabecalhoTasks/cabecalhoTasks'
import TasksComponent from '../../Components/TasksComponent/tasksComponent';
import styles from './styles.module.css'
import ChartComponent from '../../Components/ChartComponent/chatrComponent';
import StatusTasks from '../../Components/StatusTasks/statusTasks';
import type { TaskData } from '../../backend/api';
import { localStorageManager } from '../../utils/localStorage';

export default function Tasks() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [allTasks, setAllTasks] = useState<TaskData[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskData[]>([]);

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

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'tasks_criadas') {
                loadTasks();
            }
        };

        const handleTasksUpdate = () => {
            loadTasks();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('tasksUpdated', handleTasksUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('tasksUpdated', handleTasksUpdate);
        };
    }, []);

    const loadTasks = () => {
        const savedTasks: TaskData[] = JSON.parse(localStorageManager.getItem("tasks_criadas") || "[]");
        setAllTasks(savedTasks);
        setFilteredTasks(savedTasks);
    };

    const handleFilterApply = (filteredTasks: TaskData[]) => {
        setFilteredTasks(filteredTasks);
    };

    return (
        <div className={`${styles.pageContainer} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
            <div className={styles.contentCard}>
                <CabecalhoTasks onFilterApply={handleFilterApply} allTasks={allTasks} />
                <div className={`${styles.cardsContainer} ${styles.spacedContainer}`}>
                    <TasksComponent filteredTasks={filteredTasks} />
                </div>
                <div className={styles.chartsContainer}>
                        <ChartComponent filteredTasks={filteredTasks} />
                        <StatusTasks/>
                </div>
            </div>
        </div>
    )
}