export class GetDate {
    dia: number;
    mes: number;
    private mesesAbrev = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    constructor() {
        this.dia = new Date().getDate()
        this.mes = new Date().getMonth() + 1
    }

    exibeDate() {
        const formatDate = `${this.dia.toString().padStart(2, '0')}/${this.mesesAbrev[this.mes - 1]}`
        return formatDate
    }

    exibeHoras(): string {
        const agora = new Date();
        const h = agora.getHours().toString().padStart(2, '0');
        const m = agora.getMinutes().toString().padStart(2, '0');
        const s = agora.getSeconds().toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }
}