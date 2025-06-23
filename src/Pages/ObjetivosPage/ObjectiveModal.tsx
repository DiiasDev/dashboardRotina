import React, { useState, useEffect } from 'react';

interface Objective {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  completed: boolean;
  createdAt: string;
}

interface ObjectiveModalProps {
  objective?: Objective | null;
  onSave: (data: any) => void;
  onClose: () => void;
}

export default function ObjectiveModal({ objective, onSave, onClose }: ObjectiveModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetValue: 0,
    currentValue: 0,
  });

  useEffect(() => {
    if (objective) {
      setFormData({
        title: objective.title,
        description: objective.description,
        targetValue: objective.targetValue,
        currentValue: objective.currentValue,
      });
    }
  }, [objective]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || formData.targetValue <= 0) return;
    
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Value') ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{objective ? 'Editar Objetivo' : 'Novo Objetivo'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="objective-form">
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Comprar um carro"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva seu objetivo..."
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="targetValue">Valor Meta (R$)</label>
              <input
                type="number"
                id="targetValue"
                name="targetValue"
                value={formData.targetValue}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            {objective && (
              <div className="form-group">
                <label htmlFor="currentValue">Valor Atual (R$)</label>
                <input
                  type="number"
                  id="currentValue"
                  name="currentValue"
                  value={formData.currentValue}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {objective ? 'Salvar Alterações' : 'Criar Objetivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
