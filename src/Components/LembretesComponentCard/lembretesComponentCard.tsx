import styles from "./styles.module.css";
import { Card } from "@mui/material";
import { useState, useEffect } from "react";
import AdicionarLembretes from "../modals/AdicionarLembretes/adicionarLembretes";
import { Lembretes, LembretesData } from "../../logic/lembretes";

export default function LembretesComponentCard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lembretes, setLembretes] = useState<LembretesData[]>([]);
  const [filtroAtivo, setFiltroAtivo] = useState("todos");

  const lembretesManager = new Lembretes(0, new Date(), "", 0, "");

  useEffect(() => {
    carregarLembretes();

    const handleSidebarToggle = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.collapsed);
    };

    window.addEventListener(
      "sidebarToggle",
      handleSidebarToggle as EventListener
    );

    return () => {
      window.removeEventListener(
        "sidebarToggle",
        handleSidebarToggle as EventListener
      );
    };
  }, []);

  const carregarLembretes = () => {
    const lembretesStorage = JSON.parse(
      localStorage.getItem("lembretes") || "[]"
    );
    setLembretes(lembretesStorage);
  };

  const handleAddLembrete = () => {
    carregarLembretes();
    setIsModalOpen(false);
  };

  const handleConcluirLembrete = (id: number) => {
    const lembretesAtualizados = lembretes.map((lembrete) =>
      lembrete.id === id ? { ...lembrete, concluido: true } : lembrete
    );

    setLembretes(lembretesAtualizados);
    localStorage.setItem("lembretes", JSON.stringify(lembretesAtualizados));
  };

  const handleExcluirLembrete = (id: number) => {
    const lembretesAtualizados = lembretes.filter(
      (lembrete) => lembrete.id !== id
    );
    setLembretes(lembretesAtualizados);
    localStorage.setItem("lembretes", JSON.stringify(lembretesAtualizados));
  };

  const handleFiltroChange = (filtro: string) => {
    setFiltroAtivo(filtro);
  };

  const getLembretesFiltrados = () => {
    switch (filtroAtivo) {
      case "hoje":
        return lembretesManager.lembretesDia(lembretes);
      case "semana":
        return lembretesManager.lembretesSemana(lembretes);
      case "mes":
        return lembretesManager.lembretesMensal(lembretes);
      default:
        return lembretes;
    }
  };

  const getLembretesVencidos = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return lembretes.filter(lembrete => {
      const dataLembrete = new Date(lembrete.date);
      dataLembrete.setHours(0, 0, 0, 0);
      return dataLembrete < hoje && !lembrete.concluido;
    });
  };

  const getEstatisticasPorPrioridade = () => {
    const stats = lembretes.reduce((acc, lembrete) => {
      if (!acc[lembrete.prioridade]) {
        acc[lembrete.prioridade] = { total: 0, concluidos: 0 };
      }
      acc[lembrete.prioridade].total++;
      if (lembrete.concluido) {
        acc[lembrete.prioridade].concluidos++;
      }
      return acc;
    }, {} as Record<string, { total: number; concluidos: number }>);

    return Object.entries(stats).map(([prioridade, data]) => ({
      prioridade,
      total: data.total,
      concluidos: data.concluidos,
      percentual: Math.round((data.concluidos / data.total) * 100)
    }));
  };

  const getAtividadesRecentes = () => {
    return lembretes
      .filter(l => l.concluido)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const formatarHorario = (horario: number) => {
    const horarioStr = horario.toString().padStart(4, "0");
    const horas = horarioStr.slice(0, 2);
    const minutos = horarioStr.slice(2, 4);
    return `${horas}:${minutos}`;
  };

  const lembretesHoje = lembretesManager.lembretesDia(lembretes);
  const lembretesSemana = lembretesManager.lembretesSemana(lembretes);
  const lembretesMes = lembretesManager.lembretesMensal(lembretes);

  const lembretesFiltrados = getLembretesFiltrados();
  const lembretesPendentes = lembretesFiltrados.filter((l) => !l.concluido);
  const lembretesConcluidos = lembretesFiltrados.filter((l) => l.concluido);
  const lembretesVencidos = getLembretesVencidos();
  const estatisticasPrioridade = getEstatisticasPorPrioridade();
  const atividadesRecentes = getAtividadesRecentes();

  const totalLembretes = lembretes.length;
  const totalConcluidos = lembretes.filter((l) => l.concluido).length;
  const taxaConclusao =
    totalLembretes > 0
      ? Math.round((totalConcluidos / totalLembretes) * 100)
      : 0;

  return (
    <div
      className={`${styles.container} ${sidebarCollapsed ? styles.sidebarCollapsed : ""
        }`}
    >
      <Card className={styles.mainCard}>
        <div className={styles.cabecalho}>
          <h3 className={styles.title}>Lembretes</h3>
          <div className={styles.headerActions}>
            <select
              className={styles.filterSelect}
              value={filtroAtivo}
              onChange={(e) => handleFiltroChange(e.target.value)}
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

        <div className={styles.statsContainer}>
          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <h4 className={styles.statTitle}>Lembretes para Hoje</h4>
              <span className={styles.statSubtitle}>Tarefas agendadas</span>
            </div>
            <span className={styles.statNumber}>{lembretesHoje.length}</span>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <h4 className={styles.statTitle}>Lembretes para essa semana</h4>
              <span className={styles.statSubtitle}>Próximos 7 dias</span>
            </div>
            <span className={styles.statNumber}>{lembretesSemana.length}</span>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <h4 className={styles.statTitle}>Lembretes para esse Mês</h4>
              <span className={styles.statSubtitle}>Próximos 30 dias</span>
            </div>
            <span className={styles.statNumber}>{lembretesMes.length}</span>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <h4 className={styles.statTitle}>Taxa de Conclusão</h4>
              <span className={styles.statSubtitle}>Este mês</span>
            </div>
            <span className={styles.statNumber}>{taxaConclusao}%</span>
          </Card>
        </div>

        <div className={styles.lembretesSections}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>Lembretes Pendentes</h4>
              <span className={styles.sectionCount}>
                {lembretesPendentes.length}
              </span>
            </div>

            <div className={styles.lembretesLista}>
              {lembretesPendentes.length > 0 ? (
                lembretesPendentes.map((lembrete) => (
                  <Card key={lembrete.id} className={styles.lembreteCard}>
                    <div className={styles.lembreteContent}>
                      <div className={styles.lembreteInfo}>
                        <span className={styles.lembreteHorario}>
                          {formatarHorario(lembrete.horario)}
                        </span>
                        <h5 className={styles.lembreteTitulo}>
                          {lembrete.titulo}
                        </h5>
                        <span className={styles.lembreteData}>
                          {new Date(lembrete.date).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className={styles.lembreteActions}>
                        <span
                          className={`${styles.prioridadeBadge} ${styles[
                            `prioridade${lembrete.prioridade.charAt(0).toUpperCase() +
                            lembrete.prioridade.slice(1)
                            }`
                          ]
                            }`}
                        >
                          {lembrete.prioridade}
                        </span>
                        <button
                          className={styles.concluirBtn}
                          onClick={() => handleConcluirLembrete(lembrete.id)}
                        >
                          ✓
                        </button>
                        <button
                          className={styles.removeBtn}
                          onClick={() => handleExcluirLembrete(lembrete.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className={styles.emptyMessage}>Nenhum lembrete pendente</p>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>Concluídos</h4>
              <span className={styles.sectionCount}>
                {lembretesConcluidos.length}
              </span>
            </div>

            <div className={styles.lembretesLista}>
              {lembretesConcluidos.length > 0 ? (
                lembretesConcluidos.map((lembrete) => (
                  <Card
                    key={lembrete.id}
                    className={`${styles.lembreteCard} ${styles.lembreteCardConcluido}`}
                  >
                    <div className={styles.lembreteContent}>
                      <div className={styles.lembreteInfo}>
                        <span className={styles.lembreteHorario}>
                          {formatarHorario(lembrete.horario)}
                        </span>
                        <h5 className={styles.lembreteTitulo}>
                          {lembrete.titulo}
                        </h5>
                        <span className={styles.lembreteData}>
                          {new Date(lembrete.date).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className={styles.lembreteActions}>
                        <span className={styles.concluidoBadge}>Concluído</span>
                        <button
                          className={styles.removeBtn}
                          onClick={() => handleExcluirLembrete(lembrete.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className={styles.emptyMessage}>Nenhum lembrete concluído</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className={styles.bottomSection}>
        <Card className={styles.advancedStatsCard}>
          <h4 className={styles.sectionTitle}>Estatísticas por Prioridade</h4>
          <div className={styles.priorityStats}>
            {estatisticasPrioridade.map((stat) => (
              <div key={stat.prioridade} className={styles.priorityStatItem}>
                <div className={styles.priorityHeader}>
                  <span className={`${styles.priorityLabel} ${styles[`priority${stat.prioridade.charAt(0).toUpperCase() + stat.prioridade.slice(1)}`]}`}>
                    {stat.prioridade.toUpperCase()}
                  </span>
                  <span className={styles.priorityCount}>
                    {stat.concluidos}/{stat.total}
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${stat.percentual}%` }}
                  ></div>
                </div>
                <span className={styles.progressPercent}>{stat.percentual}%</span>
              </div>
            ))}
          </div>
        </Card>

        <div className={styles.bottomGrid}>
          <Card className={styles.overdueCard}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>⚠️ Lembretes Vencidos</h4>
              <span className={styles.sectionCount}>{lembretesVencidos.length}</span>
            </div>
            <div className={styles.overdueLista}>
              {lembretesVencidos.length > 0 ? (
                lembretesVencidos.slice(0, 3).map((lembrete) => (
                  <div key={lembrete.id} className={styles.overdueItem}>
                    <div className={styles.overdueInfo}>
                      <span className={styles.overdueTitle}>{lembrete.titulo}</span>
                      <span className={styles.overdueDate}>
                        {new Date(lembrete.date).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className={styles.overdueActions}>
                      <button
                        className={styles.concluirBtn}
                        onClick={() => handleConcluirLembrete(lembrete.id)}
                        title="Marcar como concluído"
                      >
                        ✓
                      </button>
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleExcluirLembrete(lembrete.id)}
                        title="Excluir lembrete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyMessage}>🎉 Nenhum lembrete vencido!</p>
              )}
            </div>
          </Card>

          <Card className={styles.recentActivitiesCard}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>📋 Atividades Recentes</h4>
            </div>
            <div className={styles.activitiesList}>
              {atividadesRecentes.length > 0 ? (
                atividadesRecentes.map((lembrete) => (
                  <div key={lembrete.id} className={styles.activityItem}>
                    <div className={styles.activityIcon}>✅</div>
                    <div className={styles.activityInfo}>
                      <span className={styles.activityTitle}>{lembrete.titulo}</span>
                      <span className={styles.activityDate}>
                        Concluído em {new Date(lembrete.date).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyMessage}>Nenhuma atividade recente</p>
              )}
            </div>
          </Card>

          <Card className={styles.monthSummaryCard}>
            <h4 className={styles.sectionTitle}>📊 Resumo do Mês</h4>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryNumber}>{totalLembretes}</span>
                <span className={styles.summaryLabel}>Total criados</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryNumber}>{totalConcluidos}</span>
                <span className={styles.summaryLabel}>Concluídos</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryNumber}>{lembretesVencidos.length}</span>
                <span className={styles.summaryLabel}>Vencidos</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryNumber}>{taxaConclusao}%</span>
                <span className={styles.summaryLabel}>Taxa sucesso</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <AdicionarLembretes
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLembrete}
      />
    </div>
  );
}
