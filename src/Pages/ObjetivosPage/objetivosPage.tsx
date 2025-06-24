import React, { useState, useEffect } from 'react';
import './objetivosPage.css';
import ObjectiveModal from '../../Components/modals/ObjectiveModal';
import ObjectivesHeader from '../../Components/ObjectivesHeader/ObjectivesHeader';
import ObjectivesStats from '../../Components/ObjectivesStats/ObjectivesStats';
import ObjectivesGrid from '../../Components/ObjectivesGrid/ObjectivesGrid';
import ObjectivesEmptyState from '../../Components/ObjectivesEmptyState/ObjectivesEmptyState';

interface Objective {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  completed: boolean;
  createdAt: string;
}

export default function ObjetivosPage() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingObjective, setEditingObjective] = useState<Objective | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedObjectives = localStorage.getItem('objectives');
    if (savedObjectives) {
      setObjectives(JSON.parse(savedObjectives));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('objectives', JSON.stringify(objectives));
  }, [objectives]);

  useEffect(() => {
    const handleSidebarToggle = (event: CustomEvent) => {
      console.log('Sidebar toggle event received:', event.detail);
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    // Also check initial state
    const checkSidebarState = () => {
      const sidebar = document.querySelector(`.sidebar, [class*="sidebar"]`);
      if (sidebar) {
        const isCollapsed = sidebar.classList.contains('collapsed') || 
                           sidebar.classList.toString().includes('collapsed');
        setIsSidebarCollapsed(isCollapsed);
      }
    };

    checkSidebarState();
    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);

  const handleAddObjective = (objectiveData: Omit<Objective, 'id' | 'createdAt' | 'completed' | 'currentValue'>) => {
    const newObjective: Objective = {
      id: Date.now().toString(),
      ...objectiveData,
      currentValue: 0,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setObjectives([...objectives, newObjective]);
    setIsModalOpen(false);
  };

  const handleEditObjective = (objectiveData: Omit<Objective, 'id' | 'createdAt'>) => {
    if (!editingObjective) return;
    
    const updatedObjectives = objectives.map(obj =>
      obj.id === editingObjective.id
        ? { ...obj, ...objectiveData }
        : obj
    );
    setObjectives(updatedObjectives);
    setEditingObjective(null);
    setIsModalOpen(false);
  };

  const handleDeleteObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };

  const handleUpdateProgress = (id: string, newValue: number) => {
    const updatedObjectives = objectives.map(obj => {
      if (obj.id === id) {
        const completed = newValue >= obj.targetValue;
        return { ...obj, currentValue: newValue, completed };
      }
      return obj;
    });
    setObjectives(updatedObjectives);
  };

  const openEditModal = (objective: Objective) => {
    setEditingObjective(objective);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingObjective(null);
  };

  const completedObjectives = objectives.filter(obj => obj.completed);
  const activeObjectives = objectives.filter(obj => !obj.completed);

  console.log('Sidebar collapsed state:', isSidebarCollapsed);

  return (
    <div className={`objetivos-page-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="objetivos-page">
        <ObjectivesHeader onAddObjective={() => setIsModalOpen(true)} />
        
        <ObjectivesStats 
          total={objectives.length}
          inProgress={activeObjectives.length}
          completed={completedObjectives.length}
        />

        <div className="objetivos-content">
          {objectives.length === 0 ? (
            <ObjectivesEmptyState onCreateFirst={() => setIsModalOpen(true)} />
          ) : (
            <>
              <ObjectivesGrid
                title="Em Progresso"
                objectives={activeObjectives}
                onEdit={openEditModal}
                onDelete={handleDeleteObjective}
                onUpdateProgress={handleUpdateProgress}
              />
              
              <ObjectivesGrid
                title="Concluídos"
                objectives={completedObjectives}
                onEdit={openEditModal}
                onDelete={handleDeleteObjective}
                onUpdateProgress={handleUpdateProgress}
              />
            </>
          )}
        </div>

        {isModalOpen && (
          <ObjectiveModal
            objective={editingObjective}
            onSave={editingObjective ? handleEditObjective : handleAddObjective}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}