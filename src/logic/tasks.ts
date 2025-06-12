export class Tasks {
  id: number;
  titulo: string;
  categoria: string[];
  descricao: string;
  concluido: boolean;

  private static taskCriadas: any[] = [];

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

  async init() {
    try {
      console.log("Iniciou a classe");
      await this.createTasks();
    } catch (error) {
      console.warn("Erro ao iniciar a classe", error);
    }
  }

  createTasks() {
    try {
      const task = {
        id: this.id,
        titulo: this.titulo,
        categoria: this.categoria,
        descricao: this.descricao,
        concluido: this.concluido,
      };

      Tasks.taskCriadas.push(task);

      localStorage.setItem("tasks_criadas", JSON.stringify(Tasks.taskCriadas));

      console.log("Tasks criadas:", Tasks.taskCriadas);
    } catch (error) {
      console.warn("Erro ao criar task");
    }
    return;
  }
}
