import { useState, useEffect } from 'react';
import { fetchLembretes, LembretesData, concluirLembrete, deleteLembrete } from '../backend/api';

export function useLembretes() {
  const [lembretes, setLembretes] = useState<LembretesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localMode, setLocalMode] = useState(false);

  const carregarLembretes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLembretes();
      const processedData = data.map((lembrete: any) => ({
        ...lembrete,
        prioridade: Array.isArray(lembrete.prioridade) ? lembrete.prioridade[0] : lembrete.prioridade
      }));
      setLembretes(processedData);
      setLocalMode(false);
    } catch (error) {
      console.error('Erro ao carregar lembretes:', error);
      setError('Erro ao carregar lembretes');
    } finally {
      setLoading(false);
    }
  };

  const concluir = async (id: number) => {
    try {
      setError(null);
      
      if (localMode) {
        // Modo local: apenas atualizar o estado
        setLembretes(prev => 
          prev.map(l => l.id === id ? { ...l, concluido: true, data_conclusao: new Date().toISOString() } : l)
        );
        return { success: true };
      }

      // Tentar backend primeiro
      const lembreteAtualizado = await concluirLembrete(id);
      setLembretes(prev => 
        prev.map(l => l.id === id ? { ...l, concluido: true, data_conclusao: new Date().toISOString() } : l)
      );
      return { success: true };
    } catch (error) {
      console.error('Erro ao concluir lembrete:', error);
      
      // Se falhar, usar modo local
      if (!localMode) {
        console.log('Ativando modo local para conclusão...');
        setLocalMode(true);
        setLembretes(prev => 
          prev.map(l => l.id === id ? { ...l, concluido: true, data_conclusao: new Date().toISOString() } : l)
        );
        setError('Funcionando em modo offline. As alterações não serão salvas no servidor.');
        return { success: true };
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Erro ao concluir lembrete';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const excluir = async (id: number) => {
    try {
      setError(null);
      
      if (localMode) {
        // Modo local: apenas remover do estado
        setLembretes(prev => prev.filter(l => l.id !== id));
        return { success: true };
      }

      // Tentar backend primeiro
      await deleteLembrete(id);
      setLembretes(prev => prev.filter(l => l.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir lembrete:', error);
      
      // Se falhar, usar modo local
      if (!localMode) {
        console.log('Ativando modo local para exclusão...');
        setLocalMode(true);
        setLembretes(prev => prev.filter(l => l.id !== id));
        setError('Funcionando em modo offline. As alterações não serão salvas no servidor.');
        return { success: true };
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir lembrete';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    carregarLembretes();
  }, []);

  return {
    lembretes,
    loading,
    error,
    localMode,
    carregarLembretes,
    concluir,
    excluir
  };
}