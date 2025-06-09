import { useState, useEffect } from 'react'
import CabecalhoTasks from '../../Components/CabecalhoTasks/cabecalhoTasks'
import TasksComponent from '../../Components/TasksComponent/tasksComponent';
import styles from './styles.module.css'

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
            </div>
        </div>
    )
}