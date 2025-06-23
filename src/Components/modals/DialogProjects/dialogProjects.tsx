import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { TextField } from "@mui/material";

interface DialogProjectsProps {
  open: boolean;
  onClose: () => void;
  onSave: (projectData: ProjectFormData) => void;
}

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  status: 'ativo' | 'pausado' | 'concluido';
}

export default function DialogProjects({ open, onClose, onSave }: DialogProjectsProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    category: "",
    status: "ativo"
  });

  const categorias = ["Casa", "Trabalho", "Estudos", "Saúde", "Exercício", "Lazer", "Compras", "Viagem", "Família", "Amigos"];
  const statusOptions = [
    { value: "ativo", label: "Ativo" },
    { value: "pausado", label: "Pausado" },
    { value: "concluido", label: "Concluído" }
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert("Título é obrigatório!");
      return;
    }
    if (!formData.category) {
      alert("Categoria é obrigatória!");
      return;
    }

    onSave(formData);

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      status: "ativo"
    });

    onClose();
  };

  const handleChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const categoryEmojis: { [key: string]: string } = {
    'Casa': '🏠',
    'Trabalho': '💼',
    'Estudos': '📚',
    'Saúde': '🏥',
    'Exercício': '💪',
    'Lazer': '🎮',
    'Compras': '🛒',
    'Viagem': '✈️',
    'Família': '👨‍👩‍👧‍👦',
    'Amigos': '👥'
  };

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleSection}>
            <span className={styles.modalIcon}>🚀</span>
            <h4 className={styles.modalTitle}>Novo Projeto</h4>
          </div>
          <button className={styles.closeButton} onClick={onClose} type="button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.formLabel}>
                <span className={styles.labelIcon}>📂</span>
                Categoria *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={styles.nativeSelect}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoryEmojis[categoria] || '📝'} {categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.formLabel}>
                <span className={styles.labelIcon}>📝</span>
                Título do Projeto *
              </label>
              <TextField
                id="title"
                placeholder="Digite o título do projeto"
                variant="outlined"
                className={styles.textField}
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>
                <span className={styles.labelIcon}>📄</span>
                Descrição do Projeto
              </label>
              <TextField
                id="description"
                placeholder="Descreva os objetivos e detalhes do projeto"
                variant="outlined"
                className={styles.textField}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                multiline
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status" className={styles.formLabel}>
                <span className={styles.labelIcon}>⚡</span>
                Status Inicial
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value as 'ativo' | 'pausado' | 'concluido')}
                className={styles.nativeSelect}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>💡</div>
              <div className={styles.infoContent}>
                <h5 className={styles.infoTitle}>Dica</h5>
                <p className={styles.infoText}>
                  Após criar o projeto, você poderá adicionar tasks relacionadas a ele através da página de Tasks, 
                  selecionando a categoria correspondente.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={!formData.title || !formData.category}
            >
              <span className={styles.buttonIcon}>✨</span>
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
