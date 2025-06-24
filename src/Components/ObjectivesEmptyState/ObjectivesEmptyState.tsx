import React from 'react';
import './ObjectivesEmptyState.css';

interface ObjectivesEmptyStateProps {
  onCreateFirst: () => void;
}

export default function ObjectivesEmptyState({ onCreateFirst }: ObjectivesEmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🎯</div>
      <h3>Nenhum objetivo criado</h3>
      <p>Comece criando seu primeiro objetivo financeiro</p>
      <button 
        className="empty-state-btn"
        onClick={onCreateFirst}
      >
        Criar Primeiro Objetivo
      </button>
    </div>
  );
}
