import styles from "./styles.module.css";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  FormControl,
} from "@mui/material";

import { useState, useEffect } from "react";

import { Lembretes } from "../../../logic/lembretes";

interface AdicionarLembretesProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void; // Changed to not expect parameters
}

export default function AdicionarLembretes({ isOpen, onClose, onSubmit }: AdicionarLembretesProps) {
  const [formData, setFormData] = useState({
    id: 0,
    titulo: "",
    data: "",
    hora: "",
    prioridade: "",
    concluido: false,
  });

  const prioridades = ["Alta", "Média", "Baixa"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.titulo && formData.data && formData.hora && formData.prioridade) {
      const horarioNumerico = parseInt(formData.hora.replace(':', ''));
      
      const newLembrete = new Lembretes(
        Date.now(),
        new Date(`${formData.data}T${formData.hora}`),
        formData.titulo,
        horarioNumerico,
        formData.prioridade
      );

      newLembrete.createLembrate();
      
      onSubmit?.();
      setFormData({ id: 0, titulo: "", data: "", hora: "", prioridade: "", concluido: false });
      onClose();
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

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>Adicionar Lembrete</h4>
          <button className={styles.closeButton} onClick={onClose} type="button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label htmlFor="titulo" className={styles.formLabel}>Título *</label>
              <TextField
                id="titulo"
                placeholder="Digite o título do lembrete"
                variant="outlined"
                className={styles.textField}
                value={formData.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="data" className={styles.formLabel}>Data do Lembrete *</label>
              <TextField
                id="data"
                type="date"
                variant="outlined"
                className={styles.textField}
                value={formData.data}
                onChange={(e) => handleChange("data", e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="hora" className={styles.formLabel}>Hora *</label>
              <TextField
                id="hora"
                type="time"
                variant="outlined"
                className={styles.textField}
                value={formData.hora}
                onChange={(e) => handleChange("hora", e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="prioridade" className={styles.formLabel}>Prioridade *</label>
              <FormControl className={styles.selectField} required>
                <Select
                  id="prioridade"
                  value={formData.prioridade}
                  onChange={(e) => handleChange("prioridade", e.target.value)}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        zIndex: 10000,
                        marginTop: 4,
                        borderRadius: 12,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                        border: '1px solid #e5e7eb',
                      },
                    },
                    disablePortal: true,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    },
                  }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: '#9ca3af' }}>Selecione a prioridade</span>;
                    }
                    return selected;
                  }}
                >
                  {prioridades.map((prioridade) => (
                    <MenuItem key={prioridade} value={prioridade}>
                      {prioridade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  label="Marcar como concluído"
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
              disabled={!formData.titulo || !formData.data || !formData.hora || !formData.prioridade}
            >
              Adicionar Lembrete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}