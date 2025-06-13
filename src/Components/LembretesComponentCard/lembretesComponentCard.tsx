import styles from "./styles.module.css";
import { Card, Container, Grid, Box } from "@mui/material";
import { useState, useEffect } from "react";
import AdicionarLembretes from "../modals/AdicionarLembretes/adicionarLembretes";

export default function LembretesComponentCard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lembretes, setLembretes] = useState([
    { id: 1, titulo: "Reunião com equipe", data: "2024-01-15", horario: "14:00", prioridade: "alta", concluido: false },
    { id: 2, titulo: "Enviar relatório mensal", data: "2024-01-16", horario: "16:30", prioridade: "media", concluido: false },
    { id: 3, titulo: "Ligar para cliente", data: "2024-01-14", horario: "09:00", prioridade: "alta", concluido: true },
    { id: 4, titulo: "Revisar documentos", data: "2024-01-17", horario: "11:15", prioridade: "baixa", concluido: false },
    { id: 5, titulo: "Backup do sistema", data: "2024-01-15", horario: "18:00", prioridade: "media", concluido: false }
  ]);

  useEffect(() => {
    const handleSidebarToggle = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.collapsed);
    };

    window.addEventListener("sidebarToggle", handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener("sidebarToggle", handleSidebarToggle as EventListener);
    };
  }, []);

  const handleAddLembrete = (novoLembrete: any) => {
    const lembreteComId = {
      ...novoLembrete,
      id: lembretes.length + 1,
      prioridade: novoLembrete.prioridade.toLowerCase(),
      horario: novoLembrete.hora,
    };
    setLembretes(prev => [...prev, lembreteComId]);
  };

  const lembretesPendentes = lembretes.filter(l => !l.concluido);
  const lembretesConcluidos = lembretes.filter(l => l.concluido);

  return (
    <div className={`${styles.container} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
      <Card className={styles.mainCard}>
        <div className={styles.cabecalho}>
          <h3 className={styles.title}>Lembretes</h3>
          <div className={styles.headerActions}>
            <select className={styles.filterSelect}>
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

        <div className={styles.statsContainer}>
          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <h4 className={styles.statTitle}>Lembretes para Hoje</h4>
              <span className={styles.statSubtitle}>Tarefas agendadas</span>
            </div>
            <span className={styles.statNumber}>4</span>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <h4 className={styles.statTitle}>Lembretes para essa semana</h4>
              <span className={styles.statSubtitle}>Próximos 7 dias</span>
            </div>
            <span className={styles.statNumber}>8</span>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <h4 className={styles.statTitle}>Lembretes para esse Mês</h4>
              <span className={styles.statSubtitle}>Próximos 30 dias</span>
            </div>
            <span className={styles.statNumber}>16</span>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <h4 className={styles.statTitle}>Taxa de Conclusão</h4>
              <span className={styles.statSubtitle}>Este mês</span>
            </div>
            <span className={styles.statNumber}>78%</span>
          </Card>
        </div>

        <div className={styles.lembretesSections}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>Lembretes Pendentes</h4>
              <span className={styles.sectionCount}>{lembretesPendentes.length}</span>
            </div>
            
            <div className={styles.lembretesLista}>
              {lembretesPendentes.map(lembrete => (
                <Card key={lembrete.id} className={styles.lembreteCard}>
                  <div className={styles.lembreteContent}>
                    <div className={styles.lembreteInfo}>
                      <span className={styles.lembreteHorario}>{lembrete.horario}</span>
                      <h5 className={styles.lembreteTitulo}>{lembrete.titulo}</h5>
                      <span className={styles.lembreteData}>{new Date(lembrete.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className={styles.lembreteActions}>
                      <span className={`${styles.prioridadeBadge} ${styles[`prioridade${lembrete.prioridade.charAt(0).toUpperCase() + lembrete.prioridade.slice(1)}`]}`}>
                        {lembrete.prioridade}
                      </span>
                      <button className={styles.concluirBtn}>✓</button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>Concluídos Hoje</h4>
              <span className={styles.sectionCount}>{lembretesConcluidos.length}</span>
            </div>
            
            <div className={styles.lembretesLista}>
              {lembretesConcluidos.map(lembrete => (
                <Card key={lembrete.id} className={`${styles.lembreteCard} ${styles.lembreteCardConcluido}`}>
                  <div className={styles.lembreteContent}>
                    <div className={styles.lembreteInfo}>
                      <span className={styles.lembreteHorario}>{lembrete.horario}</span>
                      <h5 className={styles.lembreteTitulo}>{lembrete.titulo}</h5>
                      <span className={styles.lembreteData}>{new Date(lembrete.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className={styles.lembreteActions}>
                      <span className={styles.concluidoBadge}>Concluído</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h4 className={styles.sectionTitle}>Ações Rápidas</h4>
          <div className={styles.actionButtons}>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>📅</span>
              Ver Calendário
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>🔔</span>
              Configurar Notificações
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>📊</span>
              Relatórios
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>⚙️</span>
              Configurações
            </button>
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
