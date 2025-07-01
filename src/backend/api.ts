import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

// Tipos dos dados
export type TaskData = {
  id: number;
  titulo: string;
  categoria: string;
  descricao: string;
  concluido: boolean;
  data_criacao: string;
  data_conclusao?: string;
  prioridade?: 'alta' | 'media' | 'baixa';
};

export type LembretesData = {
  id: number;
  titulo: string;
  date: Date;
  horario: number;
  prioridade?: 'alta' | 'media' | 'baixa';
  concluido?: boolean;
  data_criacao?: string;
  data_conclusao?: string;
};

// Funções para tarefas
export async function fetchTasks(): Promise<TaskData[]> {
  const { data } = await axios.get(`${API_BASE_URL}/tasks`);
  return data;
}

export async function createTask(task: Omit<TaskData, 'id' | 'data_criacao' | 'data_conclusao'>): Promise<TaskData> {
  const { data } = await axios.post(`${API_BASE_URL}/tasks`, task);
  return data;
}

export async function deleteTask(taskId: number): Promise<void> {
  await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
}

export async function concluirTask(taskId: number): Promise<TaskData> {
  const { data } = await axios.post(`${API_BASE_URL}/tasks/${taskId}/concluir`);
  return data;
}

// Funções para lembretes
export async function fetchLembretes(): Promise<LembretesData[]> {
  const { data } = await axios.get(`${API_BASE_URL}/lembretes`);
  return data;
}

export async function createLembrete(lembrete: Omit<LembretesData, 'id' | 'date'> & { date: string }): Promise<LembretesData> {
  const { data } = await axios.post(`${API_BASE_URL}/lembretes`, lembrete);
  return data;
}