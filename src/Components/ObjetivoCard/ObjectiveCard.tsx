import React, { useState } from 'react';

interface Objective {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  completed: boolean;
  createdAt: string;
}

interface ObjectiveCardProps {
  objective: Objective;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateProgress: (value: number) => void;
}

export default function ObjectiveCard({ objective, onEdit, onDelete, onUpdateProgress }: ObjectiveCardProps) {
  const [showProgressInput, setShowProgressInput] = useState(false);
  const [progressValue, setProgressValue] = useState(objective.currentValue);

  const progress = Math.min((objective.currentValue / objective.targetValue) * 100, 100);

  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProgress(progressValue);
    setShowProgressInput(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className={`objective-card ${objective.completed ? 'completed' : ''}`}>
      {objective.completed && (
        <div className="completion-badge">
          <span>✓</span>
          Concluído!
        </div>
      )}

      <div className="card-header">
        <h3>{objective.title}</h3>
        <div className="card-actions">
          <button className="action-btn edit-btn" onClick={onEdit} title="Editar">
            ✏️
          </button>
          <button className="action-btn delete-btn" onClick={onDelete} title="Excluir">
            🗑️
          </button>
        </div>
      </div>

      {objective.description && (
        <p className="objective-description">{objective.description}</p>
      )}

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Progresso</span>
          <span className="progress-percentage">{progress.toFixed(1)}%</span>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="progress-values">
          <span>{formatCurrency(objective.currentValue)}</span>
          <span>{formatCurrency(objective.targetValue)}</span>
        </div>
      </div>

      {!objective.completed && (
        <div className="update-progress">
          {!showProgressInput ? (
            <button 
              className="update-btn"
              onClick={() => setShowProgressInput(true)}
            >
              Atualizar Progresso
            </button>
          ) : (
            <form onSubmit={handleProgressSubmit} className="progress-form">
              <input
                type="number"
                value={progressValue}
                onChange={(e) => setProgressValue(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                placeholder="Novo valor"
                autoFocus
              />
              <div className="progress-form-actions">
                <button type="submit" className="save-progress-btn">✓</button>
                <button 
                  type="button" 
                  className="cancel-progress-btn"
                  onClick={() => setShowProgressInput(false)}
                >
                  ×
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
