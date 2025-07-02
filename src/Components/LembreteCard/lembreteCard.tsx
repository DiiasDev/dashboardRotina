import { useState } from "react";
import { Card } from "@mui/material";
import { LembretesData } from '../../backend/api';
import styles from "./styles.module.css";

interface LembreteCardProps {
  lembrete: LembretesData;
  onConcluir: (id: number) => Promise<{ success: boolean; error?: string }>;
  onExcluir: (id: number) => Promise<{ success: boolean; error?: string }>;
}

export function LembreteCard({ lembrete, onConcluir, onExcluir }: LembreteCardProps) {
  const [loadingConcluir, setLoadingConcluir] = useState(false);
  const [loadingExcluir, setLoadingExcluir] = useState(false);

  const formatarHorario = (horario: number) => {
    const horarioStr = horario.toString().padStart(4, "0");
    return `${horarioStr.slice(0, 2)}:${horarioStr.slice(2, 4)}`;
  };

  const handleConcluir = async () => {
    setLoadingConcluir(true);
    try {
      const result = await onConcluir(lembrete.id);
      if (!result.success) {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao concluir:', error);
      alert('Erro inesperado ao concluir lembrete');
    } finally {
      setLoadingConcluir(false);
    }
  };

  const handleExcluir = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este lembrete?')) {
      return;
    }
    
    setLoadingExcluir(true);
    try {
      const result = await onExcluir(lembrete.id);
      if (!result.success) {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro inesperado ao excluir lembrete');
    } finally {
      setLoadingExcluir(false);
    }
  };

  return (
    <Card className={`${styles.lembreteCard} ${lembrete.concluido ? styles.lembreteCardConcluido : ''}`}>
      <div className={styles.lembreteContent}>
        <div className={styles.lembreteInfo}>
          <span className={styles.lembreteHorario}>
            {formatarHorario(lembrete.horario)}
          </span>
          <h5 className={styles.lembreteTitulo}>{lembrete.titulo}</h5>
          <span className={styles.lembreteData}>
            {new Date(lembrete.date).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <div className={styles.lembreteActions}>
          {lembrete.prioridade && (
            <span className={`${styles.prioridadeBadge} ${styles[`prioridade${lembrete.prioridade.charAt(0).toUpperCase() + lembrete.prioridade.slice(1)}`]}`}>
              {lembrete.prioridade}
            </span>
          )}
          {!lembrete.concluido && (
            <button
              className={styles.concluirBtn}
              onClick={handleConcluir}
              disabled={loadingConcluir}
            >
              {loadingConcluir ? '...' : '✓'}
            </button>
          )}
          <button
            className={styles.removeBtn}
            onClick={handleExcluir}
            disabled={loadingExcluir}
          >
            {loadingExcluir ? '...' : '🗑️'}
          </button>
        </div>
      </div>
    </Card>
  );
}