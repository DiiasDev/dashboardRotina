import { useMemo } from 'react';
import { LembretesData } from '../backend/api';

export function useLembretesFilters(lembretes: LembretesData[], filtroAtivo: string) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const filtros = useMemo(() => ({
    hoje: lembretes.filter(l => {
      const data = new Date(l.date);
      data.setHours(0, 0, 0, 0);
      return data.getTime() === hoje.getTime();
    }),
    
    semana: lembretes.filter(l => {
      const data = new Date(l.date);
      const diff = data.getTime() - hoje.getTime();
      return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
    }),
    
    mes: lembretes.filter(l => {
      const data = new Date(l.date);
      const diff = data.getTime() - hoje.getTime();
      return diff >= 0 && diff <= 30 * 24 * 60 * 60 * 1000;
    }),
    
    vencidos: lembretes.filter(l => {
      const data = new Date(l.date);
      data.setHours(0, 0, 0, 0);
      return data < hoje && !l.concluido;
    })
  }), [lembretes, hoje]);

  const lembretesFiltrados = useMemo(() => {
    switch (filtroAtivo) {
      case 'hoje': return filtros.hoje;
      case 'semana': return filtros.semana;
      case 'mes': return filtros.mes;
      default: return lembretes;
    }
  }, [filtroAtivo, filtros, lembretes]);

  return {
    ...filtros,
    lembretesFiltrados,
    pendentes: lembretesFiltrados.filter(l => !l.concluido),
    concluidos: lembretesFiltrados.filter(l => l.concluido)
  };
}