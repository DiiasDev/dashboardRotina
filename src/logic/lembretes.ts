export type LembretesData = {
  id: number;
  titulo: string;
  date: Date;
  horario: number;
  prioridade: string;
  concluido?: boolean; // Adicionar esta propriedade
};

export class Lembretes {
  id: number;
  titulo: string;
  date: Date;
  horario: number;
  prioridade: string;

  private static lembretesCriados: LembretesData[] = [];

  constructor(
    id: number,
    date: Date,
    titulo: string,
    horario: number,
    prioridade: string
  ) {
    this.id = id;
    this.date = date;
    this.titulo = titulo;
    this.horario = horario;
    this.prioridade = prioridade;
  }

  createLembrate() {
    try {
      const lembrete = {
        id: this.id,
        titulo: this.titulo,
        date: this.date,
        horario: this.horario,
        prioridade: this.prioridade,
        concluido: false 
      };

      const lembretesExistentes = JSON.parse(localStorage.getItem('lembretes') || '[]');
      lembretesExistentes.push(lembrete);

      localStorage.setItem('lembretes', JSON.stringify(lembretesExistentes));
      Lembretes.lembretesCriados = lembretesExistentes;

      console.log("Lembretes adicionados: ", Lembretes.lembretesCriados);
    } catch (error) {
      console.warn("Erro ao adicionar lembrete", error);
    }
  }

  static carregarLembretes(): LembretesData[] {
    return JSON.parse(localStorage.getItem('lembretes') || '[]');
  }

  lembretesMensal(lembrete: LembretesData[]): LembretesData[] {
    const lembretes = lembrete.length > 0 ? lembrete : Lembretes.carregarLembretes();

    const now = new Date();
    const filterTrintaDias = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const lembretesMensais = lembretes.filter((item) => {
      const dataLembrete = new Date(item.date);
      return dataLembrete >= now && dataLembrete <= filterTrintaDias;
    });

    console.log("Lembretes mensais:", lembretesMensais);
    return lembretesMensais;
  }

  lembretesSemana(lembrete: LembretesData[]): LembretesData[] {
    const lembretes = lembrete.length > 0 ? lembrete : Lembretes.carregarLembretes();

    const now = new Date();
    const filterSemana = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const lembretesSemanais = lembretes.filter((item) => {
      const dataLembrete = new Date(item.date);
      return dataLembrete >= now && dataLembrete <= filterSemana;
    });

    console.log("Lembretes Semanais:", lembretesSemanais);
    return lembretesSemanais;
  }

  lembretesDia(lembrete: LembretesData[]): LembretesData[] {
    const lembretes = lembrete.length > 0 ? lembrete : Lembretes.carregarLembretes();

    const now = new Date();
    now.setHours(0, 0, 0, 0); 
    const fimDia = new Date(now);
    fimDia.setHours(23, 59, 59, 999); 

    const lembretesDiario = lembretes.filter((item) => {
      const dataLembrete = new Date(item.date);
      return dataLembrete >= now && dataLembrete <= fimDia;
    });

    console.log("Lembretes Hoje:", lembretesDiario);
    return lembretesDiario;
  }
}