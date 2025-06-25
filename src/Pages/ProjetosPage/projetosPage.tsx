import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import DialogProjects from '../../Components/modals/DialogProjects/dialogProjects';

interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    progress: number;
    totalTasks: number;
    completedTasks: number;
    createdAt: string;
    status: 'ativo' | 'pausado' | 'concluido';
}

interface ProjectFormData {
    title: string;
    description: string;
    category: string;
    status: 'ativo' | 'pausado' | 'concluido';
}

export default function ProjetosPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    // Mock data - will be replaced with real data later
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: "Dashboard Pessoal",
            description: "Desenvolvimento de um dashboard completo para gerenciamento de rotina pessoal com React e TypeScript",
            category: "Trabalho",
            progress: 75,
            totalTasks: 12,
            completedTasks: 9,
            createdAt: "2024-01-15",
            status: "ativo"
        },
        {
            id: 2,
            title: "Estudos React Avançado",
            description: "Aprofundamento em hooks avançados, context API, e otimização de performance",
            category: "Estudos",
            progress: 45,
            totalTasks: 8,
            completedTasks: 4,
            createdAt: "2024-02-01",
            status: "ativo"
        },
        {
            id: 3,
            title: "Organização da Casa",
            description: "Projeto de reforma e organização dos ambientes da casa",
            category: "Casa",
            progress: 30,
            totalTasks: 15,
            completedTasks: 5,
            createdAt: "2024-01-20",
            status: "pausado"
        }
    ]);

    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'ativo').length;
    const completedProjects = projects.filter(p => p.status === 'concluido').length;
    const averageProgress = projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length) : 0;

    const handleAddProject = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSaveProject = (projectData: ProjectFormData) => {
        const newProject: Project = {
            id: Math.floor(Math.random() * 90000000) + 10000000,
            title: projectData.title,
            description: projectData.description,
            category: projectData.category,
            progress: 0,
            totalTasks: 0,
            completedTasks: 0,
            createdAt: new Date().toISOString().split('T')[0],
            status: projectData.status
        };

        setProjects(prev => [...prev, newProject]);
        console.log('Novo projeto criado:', newProject);
    };

    const handleViewProject = (projectId: number) => {
        // TODO: Navigate to project details
        console.log('View project:', projectId);
    };

    const handleEditProject = (projectId: number) => {
        // TODO: Open edit modal
        console.log('Edit project:', projectId);
    };

    const handleDeleteProject = (projectId: number) => {
        if (window.confirm('Tem certeza que deseja remover este projeto?')) {
            setProjects(prev => prev.filter(p => p.id !== projectId));
            console.log('Project deleted:', projectId);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ativo': return '#22c55e';
            case 'pausado': return '#f59e42';
            case 'concluido': return '#3b82f6';
            default: return '#64748b';
        }
    };

    const categoryEmojis: { [key: string]: string } = {
        'Casa': '🏠',
        'Trabalho': '💼',
        'Estudos': '📚',
        'Saúde': '🏥',
        'Exercício': '💪',
        'Lazer': '🎮'
    };

    useEffect(() => {
        const handleSidebarToggle = (event: CustomEvent) => {
            setSidebarCollapsed(event.detail.collapsed);
        };

        window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
        
        return () => {
            window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
        };
    }, []);

    return (
        <div className={`${styles.container} ${sidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>
                    <span className={styles.pageIcon}>🚀</span>
                    Meus Projetos
                </h1>
                <button className={styles.addProjectButton} onClick={handleAddProject}>
                    <span>+</span>
                    Novo Projeto
                </button>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statIcon}>📊</span>
                    <h3 className={styles.statValue}>{totalProjects}</h3>
                    <p className={styles.statLabel}>Total de Projetos</p>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statIcon}>⚡</span>
                    <h3 className={styles.statValue}>{activeProjects}</h3>
                    <p className={styles.statLabel}>Projetos Ativos</p>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statIcon}>✅</span>
                    <h3 className={styles.statValue}>{completedProjects}</h3>
                    <p className={styles.statLabel}>Projetos Concluídos</p>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statIcon}>📈</span>
                    <h3 className={styles.statValue}>{averageProgress}%</h3>
                    <p className={styles.statLabel}>Progresso Médio</p>
                </div>
            </div>

            {projects.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📋</div>
                    <h3 className={styles.emptyTitle}>Nenhum projeto criado</h3>
                    <p className={styles.emptyDescription}>
                        Comece criando seu primeiro projeto e organize suas tarefas por categorias
                    </p>
                    <button className={styles.addProjectButton} onClick={handleAddProject}>
                        <span>+</span>
                        Criar Primeiro Projeto
                    </button>
                </div>
            ) : (
                <div className={styles.projectsGrid}>
                    {projects.map((project) => (
                        <div key={project.id} className={styles.projectCard}>
                            <div className={styles.projectHeader}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <span 
                                    className={styles.projectCategory}
                                    style={{ backgroundColor: getStatusColor(project.status) + '20', 
                                            color: getStatusColor(project.status) }}
                                >
                                    {categoryEmojis[project.category] || '📝'} {project.category}
                                </span>
                            </div>

                            <p className={styles.projectDescription}>
                                {project.description}
                            </p>

                            <div className={styles.progressSection}>
                                <div className={styles.progressHeader}>
                                    <span className={styles.progressLabel}>Progresso</span>
                                    <span className={styles.progressPercentage}>{project.progress}%</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div 
                                        className={styles.progressFill}
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className={styles.projectStats}>
                                <div className={styles.statItem}>
                                    <h4 className={styles.statItemValue}>{project.totalTasks}</h4>
                                    <p className={styles.statItemLabel}>Total Tasks</p>
                                </div>
                                <div className={styles.statItem}>
                                    <h4 className={styles.statItemValue}>{project.completedTasks}</h4>
                                    <p className={styles.statItemLabel}>Concluídas</p>
                                </div>
                                <div className={styles.statItem}>
                                    <h4 
                                        className={styles.statItemValue}
                                        style={{ color: getStatusColor(project.status) }}
                                    >
                                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                    </h4>
                                    <p className={styles.statItemLabel}>Status</p>
                                </div>
                            </div>

                            <div className={styles.projectActions}>
                                <button 
                                    className={`${styles.actionButton} ${styles.primaryAction}`}
                                    onClick={() => handleViewProject(project.id)}
                                >
                                    👁️ Ver
                                </button>
                                <button 
                                    className={`${styles.actionButton} ${styles.secondaryAction}`}
                                    onClick={() => handleEditProject(project.id)}
                                >
                                    ✏️ Editar
                                </button>
                                <button 
                                    className={`${styles.actionButton} ${styles.deleteAction}`}
                                    onClick={() => handleDeleteProject(project.id)}
                                    title="Remover projeto"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <DialogProjects 
                open={modalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProject}
            />
        </div>
    );
}