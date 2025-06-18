import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { Tasks } from "../../../logic/tasks";

interface DialogTasksProps {
  open: boolean;
  onClose: () => void;
}

export default function DialogTasks({ open, onClose }: DialogTasksProps) {
  const [taskId, setTaskId] = useState<number>(0);
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    descricao: "",
    concluida: false,
    categoria: "",
    dataCreacao: ""
  });

  const categorias = ["Casa", "Trabalho", "Faculdade"];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const novoId = Math.floor(Math.random() * 90000000) + 10000000;
      setTaskId(novoId);
      setFormData((prev) => ({ ...prev, id: novoId.toString() }));
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
    
    if (!formData.titulo.trim()) {
      alert("Título é obrigatório!");
      return;
    }
    if (!formData.categoria) {
      alert("Categoria é obrigatória!");
      return;
    }

    try {
      const newTask = new Tasks(
        taskId,
        formData.titulo,
        [formData.categoria],
        formData.descricao,
        formData.concluida,
        formData.dataCreacao
      );

      newTask.createTasks();

      window.dispatchEvent(new CustomEvent('tasksUpdated'));

      const novoId = Math.floor(Math.random() * 90000000) + 10000000;
      setTaskId(novoId);
      setFormData({
        id: novoId.toString(),
        titulo: "",
        descricao: "",
        categoria: "",
        concluida: false,
        dataCreacao: ""
      });

      onClose();
    } catch (error) {
      console.warn("Erro ao criar task:", error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>Nova Task</h4>
          <button className={styles.closeButton} onClick={onClose} type="button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label htmlFor="id" className={styles.formLabel}>ID (Gerado automaticamente)</label>
              <TextField
                id="id"
                variant="outlined"
                className={`${styles.textField} ${styles.readOnlyField}`}
                value={formData.id}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="categoria" className={styles.formLabel}>Categoria *</label>
              <select
                id="categoria"
                value={formData.categoria}
                onChange={(e) => handleChange("categoria", e.target.value)}
                className={styles.nativeSelect}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="titulo" className={styles.formLabel}>Título da Task *</label>
              <TextField
                id="titulo"
                placeholder="Digite o título da task"
                variant="outlined"
                className={styles.textField}
                value={formData.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="descricao" className={styles.formLabel}>Descrição da Task</label>
              <TextField
                id="descricao"
                placeholder="Digite a descrição da task"
                variant="outlined"
                className={styles.textField}
                value={formData.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
                multiline
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <FormGroup className={styles.checkboxGroup}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.concluida}
                      onChange={(e) => handleChange("concluida", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Marcar como concluída"
                />
              </FormGroup>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={!formData.titulo || !formData.categoria}
            >
              Salvar Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
