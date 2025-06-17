export type TaskData = {
  id: number;
  titulo: string;
  categoria: string[];
  descricao: string;
  concluido: boolean;
  dataCreacao: string;
};

export class Tasks {
  id: number;
  titulo: string;
  categoria: string[];
  descricao: string;
  concluido: boolean;
  dataCreacao: string;

  private static taskCriadas: TaskData[] = [];

  constructor(id: number,titulo: string,categoria: string[],descricao: string,concluido: boolean, dataCreacao: string) {
    
    this.id = id;
    this.titulo = titulo;
    this.categoria = categoria;
    this.descricao = descricao;
    this.concluido = concluido;
    this.dataCreacao = dataCreacao;
  }

  private static carregarTasks() {
    try {
      const dadosSalvos = localStorage.getItem("tasks_criadas");
      if (dadosSalvos) {
        Tasks.taskCriadas = JSON.parse(dadosSalvos);
      }
    } catch (error) {
      console.warn("Erro ao carregar tasks do localStorage:", error);
      Tasks.taskCriadas = [];
    }
  }

  createTasks() {
    try {
      Tasks.carregarTasks();
      
      this.id = Math.floor(Math.random() * 90000000) + 10000000;

      if(Tasks.taskCriadas.find((e) => e.id === this.id)) {
        console.error("ID REPETIDO")
        return;
      }

      const task: TaskData = {
        id: this.id,
        titulo: this.titulo,
        categoria: this.categoria,
        descricao: this.descricao,
        concluido: this.concluido,
        dataCreacao: new Date().toISOString(),
      };

      Tasks.taskCriadas.push(task);

      localStorage.setItem("tasks_criadas", JSON.stringify(Tasks.taskCriadas));

    } catch (error) {
      console.warn("Erro ao criar task");
    }
    return;
  }

  marcarComoConcluida() {
    try {
      Tasks.carregarTasks();
      
      this.concluido = true;
      
      const taskIndex = Tasks.taskCriadas.findIndex(task => task.id === this.id);
      if (taskIndex !== -1) {
        Tasks.taskCriadas[taskIndex].concluido = true;
        localStorage.setItem("tasks_criadas", JSON.stringify(Tasks.taskCriadas));
      }
    } catch (error) {
      console.warn("Erro ao marcar task como concluída:", error);
    }
    return;
  }

  listarTasks(): TaskData[] {
    try {
      const dadosSalvos = localStorage.getItem("tasks_criadas");

      if (dadosSalvos) {
        Tasks.taskCriadas = JSON.parse(dadosSalvos);
        return Tasks.taskCriadas;
      }

      return []; 
    } catch (error) {
      console.warn("Erro ao carregar tasks:", error);
      return [];
    }
  }
}