export class Tasks {
    id: number;
    categoria: string[];
    titulo: string = '';
    descricao: string = ''; 
    tasksCreated: string[];

    constructor() {
        this.id = 1;
        this.categoria = ['Casa', 'Trabalho','Faculdade'];
        this.titulo = '',
        this.descricao = ''
        this.tasksCreated = []
    }

    createTask(){
        
        const tasks = {
            id: this.id,
            categoria: this.categoria,
            titulo: this.titulo,
            descricao: this.descricao,
        }
    }
}