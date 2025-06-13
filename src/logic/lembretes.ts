type LembretesData = {
  id: number;
  titulo: string;
  date: Date;
  horario: number;
  prioridade: string
};

export class Lembretes {
  id: number;
  titulo: string;
  date: Date;
  horario: number;
  prioridade: string;

  private static lembretesCriados: LembretesData[] = [];

  constructor(id: number, date: Date, titulo: string, horario: number, prioridade: string) {
    this.id = id
    this.date = date;
    this.titulo = titulo;
    this.horario = horario;
    this.prioridade = prioridade
  }

  createLembrate() {
    try {
      const lembrete = {
        id: this.id,
        titulo: this.titulo,
        date: this.date,
        horario: this.horario,
        prioridade: this.prioridade
      };

      Lembretes.lembretesCriados.push(lembrete);

      localStorage.setItem("lembretes", JSON.stringify(Lembretes.lembretesCriados));

      console.log("Lembretes adicionados: ", Lembretes.lembretesCriados);
    } catch (error) {
      console.warn("Erro ao adicionar lembrete", error);
    }
  }
}
