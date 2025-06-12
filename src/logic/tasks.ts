type TaskData = {
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

  private static taskCriadas: TaskData[] = [];

  constructor(
    id: number,
    titulo: string,
    categoria: string[],
    descricao: string,
    concluido: boolean
  ) {
    this.id = id;
    this.titulo = titulo;
    this.categoria = categoria;
    this.descricao = descricao;
    this.concluido = concluido;
  }

  createTasks() {
    try {
        this.id = Math.floor(Math.random() * 90000000) + 10000000;

      if(Tasks.taskCriadas.find((e) => e.id === this.id)) {
        alert("Id repetido");
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

      console.log("Tasks criadas:", Tasks.taskCriadas);
    } catch (error) {
      console.warn("Erro ao criar task");
    }
    return;
  }

  marcarComoConcluida() {
    this.concluido = true;
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
