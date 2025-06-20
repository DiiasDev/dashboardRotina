type chartData = {
    mounth: string,
    tasksConcluidas: number
    tasksSalvas: {concluido: boolean, dataConclusao?: string}[]
}

export class ChartData{
    mounth: string; 
    tasksConcluidas: number;

    constructor(mounth: string, tasksConcluidas: number) {
        this.mounth = mounth;
        this.tasksConcluidas = tasksConcluidas; 
    }

    data(){
        const tasksSalvas = JSON.parse(localStorage.getItem("tasks_criadas") || "[]")
        
        const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]

        const currentYear = new Date().getFullYear()

        const dataByMonth = monthNames.map((monthName, index) => {
            const tasksConcluidas = tasksSalvas.filter((task: {concluido: boolean, dataConclusao?: string}) => {
                if (!task.concluido || !task.dataConclusao) return false
                const taskDate = new Date(task.dataConclusao)
                return taskDate.getMonth() === index && taskDate.getFullYear() === currentYear
            }).length

            return {
                id: monthName,
                value: tasksConcluidas,
                monthIndex: index
            }
        })
        
        const firstMonthWithData = dataByMonth.find(month => month.value > 0)
        
        if (!firstMonthWithData) {
            return []
        }
        
        return dataByMonth
            .slice(firstMonthWithData.monthIndex)
            .map(month => ({ id: month.id, value: month.value }))
    }
}