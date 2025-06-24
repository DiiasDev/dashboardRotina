import React from 'react';
import './ObjectivesGrid.css';
import ObjectiveCard from '../ObjetivoCard/ObjectiveCard';

interface Objective {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  completed: boolean;
  createdAt: string;
}

interface ObjectivesGridProps {
  title: string;
  objectives: Objective[];
  onEdit: (objective: Objective) => void;
  onDelete: (id: string) => void;
  onUpdateProgress: (id: string, value: number) => void;
}

export default function ObjectivesGrid({ 
  title, 
  objectives, 
  onEdit, 
  onDelete, 
  onUpdateProgress 
}: ObjectivesGridProps) {
  if (objectives.length === 0) return null;

  return (
    <div className="objectives-section">
      <h2 className="section-title">{title}</h2>
      <div className="objectives-grid">
        {objectives.map(objective => (
          <ObjectiveCard
            key={objective.id}
            objective={objective}
            onEdit={() => onEdit(objective)}
            onDelete={() => onDelete(objective.id)}
            onUpdateProgress={(value) => onUpdateProgress(objective.id, value)}
          />
        ))}
      </div>
    </div>
  );
}
