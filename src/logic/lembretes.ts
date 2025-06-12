type LembretesData = {
  titulo: string;
  mensagem: string;
  date: Date;
};

export class Lembretes {
  titulo: string;
  mensagem: string;
  date: Date;

  private static lembretesCriados: LembretesData[] = [];

  constructor(mensagem: string, date: Date, titulo: string) {
    this.mensagem = mensagem;
    this.date = date;
    this.titulo = titulo;
  }

  createLembrate() {
    try {
      const lembrete = {
        titulo: this.titulo,
        mensagem: this.mensagem,
        date: this.date,
      };

      Lembretes.lembretesCriados.push(lembrete);

      localStorage.setItem("lembretes", JSON.stringify(Lembretes.lembretesCriados));

      console.log("Lembretes adicionados: ", Lembretes.lembretesCriados);
    } catch (error) {
      console.warn("Erro ao adicionar lembrete", error);
    }
  }
}
