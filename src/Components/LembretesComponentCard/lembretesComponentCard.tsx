import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { useLembretes } from "../../hooks/useLembrates";
import { useLembretesFilters } from "../../hooks/useLembretesFilter";
import { useLembretesStats } from "../../hooks/useLembretesStats";
import { LembreteCard } from "../LembreteCard/lembreteCard";
import { StatsCard } from "../LembreteStatsCard/lembreteStatsCard";
import AdicionarLembretes from "../modals/AdicionarLembretes/adicionarLembretes";
import styles from "./styles.module.css";

interface LembretesComponentCardProps {
  sidebarCollapsed?: boolean;
}

export default function LembretesComponentCard({ sidebarCollapsed = false }: LembretesComponentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [sidebarState, setSidebarState] = useState(false);
  
  const { lembretes, loading, error, localMode, carregarLembretes, concluir, excluir } = useLembretes();
  const { hoje, semana, mes, vencidos, pendentes, concluidos } = useLembretesFilters(lembretes, filtroAtivo);
  const { total, taxaConclusao, estatisticasPrioridade, atividadesRecentes } = useLembretesStats(lembretes);

  useEffect(() => {
    const handleSidebarToggle = (event: CustomEvent) => {
      setSidebarState(event.detail.collapsed);
    };

    window.addEventListener("sidebarToggle", handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener("sidebarToggle", handleSidebarToggle as EventListener);
    };
  }, []);

  const handleAddLembrete = async () => {
    setIsModalOpen(false);
    await carregarLembretes();
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={`${styles.container} ${sidebarState ? styles.sidebarCollapsed : ''}`}>
      {error && (
        <div style={{ 
          background: '#fee', 
          color: '#c00', 
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '16px',
          border: '1px solid #fcc'
        }}>
          {error}
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginLeft: '12px', padding: '4px 8px' }}
          >
            Recarregar
          </button>
        </div>
      )}

      {localMode && (
        <div style={{ 
          background: '#fff3cd', 
          color: '#856404', 
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '16px',
          border: '1px solid #ffeaa7'
        }}>
          🔄 Modo offline ativo - As alterações não serão salvas no servidor
        </div>
      )}
      
      <Card className={styles.mainCard}>
        {/* Header */}
        <div className={styles.cabecalho}>
          <h3 className={styles.title}>Lembretes</h3>
          <div className={styles.headerActions}>
            <select
              className={styles.filterSelect}
              value={filtroAtivo}
              onChange={(e) => setFiltroAtivo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="hoje">Hoje</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mês</option>
            </select>
            <button
              className={styles.addButton}
              onClick={() => setIsModalOpen(true)}
            >
              Adicionar lembrete +
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsContainer}>
          <StatsCard title="Hoje" subtitle="Tarefas agendadas" value={hoje.length} />
          <StatsCard title="Esta Semana" subtitle="Próximos 7 dias" value={semana.length} />
          <StatsCard title="Este Mês" subtitle="Próximos 30 dias" value={mes.length} />
          <StatsCard title="Taxa de Conclusão" subtitle="Este mês" value={`${taxaConclusao}%`} />
        </div>

        {/* Listas */}
        <div className={styles.lembretesSections}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4>Pendentes</h4>
              <span>{pendentes.length}</span>
            </div>
            <div className={styles.lembretesLista}>
              {pendentes.map((lembrete) => (
                <LembreteCard
                  key={lembrete.id}
                  lembrete={lembrete}
                  onConcluir={concluir}
                  onExcluir={excluir}
                />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4>Concluídos</h4>
              <span>{concluidos.length}</span>
            </div>
            <div className={styles.lembretesLista}>
              {concluidos.map((lembrete) => (
                <LembreteCard
                  key={lembrete.id}
                  lembrete={lembrete}
                  onConcluir={concluir}
                  onExcluir={excluir}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      <AdicionarLembretes
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLembrete}
      />
    </div>
  );
}