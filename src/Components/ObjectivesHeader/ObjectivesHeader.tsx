import React from 'react';
import './ObjectivesHeader.css';

interface ObjectivesHeaderProps {
  onAddObjective: () => void;
}

export default function ObjectivesHeader({ onAddObjective }: ObjectivesHeaderProps) {
  return (
    <div className="objectives-header">
      <div className="header-content">
        <h1>Meus Objetivos</h1>
        <p>Acompanhe o progresso dos seus objetivos financeiros</p>
      </div>
      <button 
        className="add-objective-btn"
        onClick={onAddObjective}
      >
        <span>+</span>
        Novo Objetivo
      </button>
    </div>
  );
}
