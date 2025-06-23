import React, { useState, useEffect } from 'react';
import './objetivosPage.css';
import ObjectiveModal from './ObjectiveModal';
import ObjectiveCard from './ObjectiveCard';

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

  useEffect(() => {
    const savedObjectives = localStorage.getItem('objectives');
    if (savedObjectives) {
      setObjectives(JSON.parse(savedObjectives));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('objectives', JSON.stringify(objectives));
  }, [objectives]);

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

  return (
    <div className="objetivos-page">
      <div className="objetivos-header">
        <div className="header-content">
          <h1>Meus Objetivos</h1>
          <p>Acompanhe o progresso dos seus objetivos financeiros</p>
        </div>
        <button 
          className="add-objective-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <span>+</span>
          Novo Objetivo
        </button>
      </div>

      <div className="objetivos-stats">
        <div className="stat-card">
          <div className="stat-number">{objectives.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{activeObjectives.length}</div>
          <div className="stat-label">Em Progresso</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedObjectives.length}</div>
          <div className="stat-label">Concluídos</div>
        </div>
      </div>

      <div className="objetivos-content">
        {activeObjectives.length > 0 && (
          <div className="objectives-section">
            <h2>Em Progresso</h2>
            <div className="objectives-grid">
              {activeObjectives.map(objective => (
                <ObjectiveCard
                  key={objective.id}
                  objective={objective}
                  onEdit={() => openEditModal(objective)}
                  onDelete={() => handleDeleteObjective(objective.id)}
                  onUpdateProgress={(value) => handleUpdateProgress(objective.id, value)}
                />
              ))}
            </div>
          </div>
        )}

        {completedObjectives.length > 0 && (
          <div className="objectives-section">
            <h2>Concluídos</h2>
            <div className="objectives-grid">
              {completedObjectives.map(objective => (
                <ObjectiveCard
                  key={objective.id}
                  objective={objective}
                  onEdit={() => openEditModal(objective)}
                  onDelete={() => handleDeleteObjective(objective.id)}
                  onUpdateProgress={(value) => handleUpdateProgress(objective.id, value)}
                />
              ))}
            </div>
          </div>
        )}

        {objectives.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3>Nenhum objetivo criado</h3>
            <p>Comece criando seu primeiro objetivo financeiro</p>
            <button 
              className="empty-state-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Criar Primeiro Objetivo
            </button>
          </div>
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
  );
}