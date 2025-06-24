import React from 'react';
import './ObjectivesStats.css';

interface ObjectivesStatsProps {
  total: number;
  inProgress: number;
  completed: number;
}

export default function ObjectivesStats({ total, inProgress, completed }: ObjectivesStatsProps) {
  return (
    <div className="objectives-stats">
      <div className="stat-card">
        <div className="stat-number">{total}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{inProgress}</div>
        <div className="stat-label">Em Progresso</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{completed}</div>
        <div className="stat-label">Concluídos</div>
      </div>
    </div>
  );
}
