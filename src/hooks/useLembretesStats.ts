import { useMemo } from 'react';
import { LembretesData } from '../backend/api';

export function useLembretesStats(lembretes: LembretesData[]) {
  return useMemo(() => {
    const total = lembretes.length;
    const concluidos = lembretes.filter(l => l.concluido).length;
    const taxaConclusao = total > 0 ? Math.round((concluidos / total) * 100) : 0;

    const porPrioridade = lembretes.reduce((acc, l) => {
      if (!l.prioridade) return acc;
      if (!acc[l.prioridade]) {
        acc[l.prioridade] = { total: 0, concluidos: 0 };
      }
      acc[l.prioridade].total++;
      if (l.concluido) acc[l.prioridade].concluidos++;
      return acc;
    }, {} as Record<string, { total: number; concluidos: number }>);

    const estatisticasPrioridade = Object.entries(porPrioridade).map(([prioridade, data]) => ({
      prioridade,
      ...data,
      percentual: Math.round((data.concluidos / data.total) * 100)
    }));

    const atividadesRecentes = lembretes
      .filter(l => l.concluido)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return {
      total,
      concluidos,
      taxaConclusao,
      estatisticasPrioridade,
      atividadesRecentes
    };
  }, [lembretes]);
}