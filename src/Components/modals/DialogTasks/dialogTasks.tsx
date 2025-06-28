import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { createTask, TaskData } from "../../../backend/api";

interface DialogTasksProps {
  open: boolean;
  onClose: () => void;
}

export default function DialogTasks({ open, onClose }: DialogTasksProps) {
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    descricao: "",
    concluido: false,
    categoria: "",
    data_criacao: "",
    prioridade: "media" as 'alta' | 'media' | 'baixa'
  });

  const [isLoadding, setIsLoadding] = useState(false);
  const [error, setError] = useState<string | null>(null)


  const categorias = ["Casa", "Trabalho", "Faculdade"];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setFormData({
        id: "",
        titulo: "",
        descricao: "",
        concluido: false,
        categoria: "",
        data_criacao: "",
        prioridade: "media"
      });
      setError(null)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    };
  }, [open]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoadding) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, onClose, isLoadding]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      setError("Título é obrigatório!");
      return;
    }
    if (!formData.categoria) {
      setError("Categoria é obrigatória!");
      return;
    }

    setIsLoadding(true);
    setError(null);

    try {
      const taskData = {
        titulo: formData.titulo.trim(),
        categoria: formData.categoria,
        descricao: formData.descricao.trim(),
        concluido: formData.concluido,
        prioridade: formData.prioridade
      };

      // Validate required fields
      if (!taskData.titulo) {
        throw new Error("Título não pode estar vazio");
      }
      if (!taskData.categoria || taskData.categoria.length === 0) {
        throw new Error("Categoria é obrigatória");
      }

      console.log("Dados sendo enviados:", JSON.stringify(taskData, null, 2));
      console.log("Tipo de dados:", {
        titulo: typeof taskData.titulo,
        categoria: typeof taskData.categoria,
        descricao: typeof taskData.descricao,
        concluido: typeof taskData.concluido,
        prioridade: typeof taskData.prioridade
      });

      const createdTask = await createTask(taskData);

      console.log("TASK CRIADA COM SUCESSO: ", createdTask);

      window.dispatchEvent(new CustomEvent('taskUpdated', {
        detail: createdTask
      }));

      // Reset form após sucesso
      setFormData({
        id: "",
        titulo: "",
        descricao: "",
        concluido: false,
        categoria: "",
        data_criacao: "",
        prioridade: "media"
      });

      // Fechar modal
      onClose();

    } catch (error) {
      console.error("Erro completo:", error);
      console.error("Stack trace:", error instanceof Error ? error.stack : 'No stack trace');
      
      let errorMessage = "Erro ao criar task";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoadding(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if(error) setError(null)
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
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}
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
              <label htmlFor="prioridade" className={styles.formLabel}>Prioridade</label>
              <select
                id="prioridade"
                value={formData.prioridade}
                onChange={(e) => handleChange("prioridade", e.target.value)}
                className={styles.nativeSelect}
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <FormGroup className={styles.checkboxGroup}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.concluido}
                      onChange={(e) => handleChange("concluido", e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Marcar como concluída"
                />
              </FormGroup>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button 
              type="button" 
              className={styles.cancelButton} 
              onClick={onClose}
              disabled={isLoadding}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!formData.titulo || !formData.categoria || isLoadding}
            >
              {isLoadding ? "Salvando..." : "Salvar Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
