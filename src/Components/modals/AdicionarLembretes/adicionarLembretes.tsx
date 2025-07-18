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
import { createLembrete } from '../../../backend/api'

interface AdicionarLembretesProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void; // Changed to not expect parameters
}

export default function AdicionarLembretes({ isOpen, onClose, onSubmit }: AdicionarLembretesProps) {
  const [formData, setFormData] = useState({
    id: '',
    titulo: '',
    date: '',
    horario: '',
    prioridade: 'Média' as 'Alta' | 'Média' | 'Baixa',
    concluido: false,
    data_criacao: '',
    data_conclusao: ''
  })

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

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo.trim()) {
      alert('titulo é necessário')
      return;
    }

    try {
      const prioridadeMap: Record<'Alta' | 'Média' | 'Baixa', 'alta' | 'media' | 'baixa'> = {
        'Alta': 'alta',
        'Média': 'media',
        'Baixa': 'baixa'
      };

      // Combine date and horario to ISO string
      // formData.date: 'YYYY-MM-DD', formData.horario: 'HH:mm'
      const dateTimeString = `${formData.date}T${formData.horario}:00`;
      const dateISO = new Date(dateTimeString).toISOString();

      const lembretesData = {
        titulo: formData.titulo.trim(),
        date: dateISO,
        horario: Number(formData.horario.replace(':', '')), // convert 'HH:mm' to number like 930 for 09:30
        prioridade: prioridadeMap[formData.prioridade],
        concluido: formData.concluido,
        data_criacao: formData.data_criacao,
        data_conclusao: formData.data_conclusao
      }

      const createdLembretes = await createLembrete(lembretesData);

      console.log('Lembrete criado com sucesso:', createdLembretes);

      if (onSubmit) onSubmit();
      onClose();

    } catch (error) {
      console.warn('Erro ao criar lembrete:', error)
    }
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
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
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
                value={formData.horario}
                onChange={(e) => handleChange("horario", e.target.value)}
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
              disabled={!formData.titulo || !formData.date || !formData.horario || !formData.prioridade}
            >
              Adicionar Lembrete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}