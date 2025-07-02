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
  date: string;
  horario: number;
  prioridade?: 'alta' | 'media' | 'baixa';
  concluido?: boolean;
  data_criacao?: string;
  data_conclusao?: string;
};

// Promise:
// Quando você chama a função, ela promete que vai te entregar o valor assim que conseguir.
// Enquanto isso, seu código pode continuar rodando normalmente, sem travar nada.
// Assim que o resultado estiver pronto (por exemplo, quando o servidor responder), a Promise é resolvida e você recebe o valor.

// Backend:
// O backend (API Flask) recebe esses dados, cria o lembrete no banco de dados, gera um novo id e devolve o lembrete completo na resposta.

// Parâmetro da função:
// lembrete: Omit<LembretesData, 'id'>

// A função espera receber um objeto do tipo LembretesData, mas sem o campo id.
// O id não é enviado pelo frontend, porque será criado pelo backend.

// TASKS

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

//LEMBRETES

export async function fetchLembretes(): Promise<LembretesData[]> {
  const { data } = await axios.get(`${API_BASE_URL}/lembretes`);
  return data;
}

export async function createLembrete(lembrete: Omit<LembretesData, 'id'>): Promise<LembretesData> {
  const { data } = await axios.post(`${API_BASE_URL}/lembretes`, lembrete);
  return data;
}

export async function deleteLembrete(lembreteId: number): Promise<void> {
  await axios.delete(`${API_BASE_URL}/lembretes/${lembreteId}`);
}

export async function concluirLembrete(lembreteId: number): Promise<LembretesData> {
  try {
    // Try the original endpoint first
    const { data } = await axios.post(`${API_BASE_URL}/lembretes/${lembreteId}/concluir`);
    return data;
  } catch (error) {
    console.error('Erro no endpoint /concluir:', error);
    
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      try {
        // Fallback 1: Try PUT request to update the lembrete
        const { data } = await axios.put(`${API_BASE_URL}/lembretes/${lembreteId}`, { 
          concluido: true,
          data_conclusao: new Date().toISOString()
        });
        return data;
      } catch (putError) {
        console.error('Erro no PUT fallback:', putError);
        
        try {
          // Fallback 2: Try PATCH request
          const { data } = await axios.patch(`${API_BASE_URL}/lembretes/${lembreteId}`, { 
            concluido: true,
            data_conclusao: new Date().toISOString()
          });
          return data;
        } catch (patchError) {
          console.error('Erro no PATCH fallback:', patchError);
          throw new Error(`Não foi possível concluir o lembrete. Endpoint não encontrado: ${error.message}`);
        }
      }
    }
    
    throw error;
  }
}