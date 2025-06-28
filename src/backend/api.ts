const API_BASE_URL = "http://localhost:5001"

export type TaskData = {
    id: number;
    titulo: string;
    categoria: string; // Alterado de string[] para string
    descricao: string;
    concluido: boolean;
    data_criacao: string;
    data_conclusao?: string;
    prioridade?: 'alta' | 'media' | 'baixa';
    created_at?: string;
    updated_at?: string;
};

//busca as tasks no banco
export const fetchTasks = async (): Promise<TaskData[]> => {
    try{
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if(!response.ok){
            throw new Error(`Erro: ${response.status}`)
        }
        return await response.json(); 
    } catch(error){
        console.error("Erro ao buscar tasks:", error)
        throw error
    }
}

//criar nova task 
export const createTask = async (taskData: Omit<TaskData, 'id' | 'data_criacao' | 'created_at' | 'updated_at'>): Promise<TaskData> => {
    try {
      // Remove conversão, pois categoria já é string
      const payload = {
        ...taskData
      };

      console.log('Sending request to:', `${API_BASE_URL}/tasks`);
      console.log('Request payload:', JSON.stringify(payload, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
      if (!response.ok) {
        let errorMessage = `Erro: ${response.status}`;
        
        try {
          const errorData = await response.text();
          console.log('Error response body:', errorData);
          
          // Try to parse as JSON first
          try {
            const jsonError = JSON.parse(errorData);
            errorMessage = jsonError.message || jsonError.error || errorMessage;
          } catch {
            // If not JSON, use the text directly
            errorMessage = errorData || errorMessage;
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
        
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
      console.log('Success response:', result);
      return result;
    } catch (error) {
      console.error('Erro ao criar uma task:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro desconhecido ao criar task');
    }
}

export const deleteTask = async (taskId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir task: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao excluir task:", error);
        throw error;
    }
}

export const concluirTask = async (taskId: number): Promise<TaskData> => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/concluir`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`Erro ao concluir task: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao concluir task:", error);
        throw error;
    }
}