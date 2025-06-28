import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar'
import { useState, useEffect } from 'react'
import { TaskData } from "../../backend/api";

interface ChartComponentProps {
    filteredTasks?: TaskData[];
}

export default function ChartComponent({ filteredTasks }: ChartComponentProps){
    const [data, setData] = useState<{id: string, value: number}[]>([])

    const generateChartData = (tasks: TaskData[]) => {
        const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]

        const currentYear = new Date().getFullYear()

        const dataByMonth = monthNames.map((monthName, index) => {
            const tasksConcluidas = tasks.filter((task) => {
                if (!task.concluido || !task.data_conclusao) return false
                const taskDate = new Date(task.data_conclusao)
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

    useEffect(() => {
        const tasksToAnalyze = filteredTasks || JSON.parse(localStorage.getItem("tasks_criadas") || "[]");
        const newData = generateChartData(tasksToAnalyze);
        setData(newData);
    }, [filteredTasks])
    
    return(
        <Container>
                <Grid>
                    <Card style={{ 
                        height: 650, 
                        width: '100%',
                        maxWidth: 1200,
                        backgroundColor: 'var(--color-surface)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        marginTop: '26px',
                        transition: 'all 0.3s ease'
                    }}>
                        <CardContent style={{ 
                            height: 580, 
                            width: '100%',
                            backgroundColor: 'transparent',
                            transition: 'all 0.3s ease'
                        }}>
                            <Typography 
                                variant='h5' 
                                style={{
                                    padding: 5,
                                    color: 'var(--color-text)',
                                    fontWeight: 600,
                                    marginBottom: '8px'
                                }}
                            >
                                Evolução da Produtividade
                            </Typography>
                            
                            {data.length === 0 ? (
                                <Box 
                                    display="flex" 
                                    justifyContent="center" 
                                    alignItems="center" 
                                    height="400px"
                                >
                                    <Typography 
                                        variant="h6" 
                                        style={{
                                            color: 'var(--color-text-secondary)',
                                            textAlign: 'center'
                                        }}
                                    >
                                        Não há dados disponíveis no período atual
                                    </Typography>
                                </Box>
                            ) : (
                                <div style={{ 
                                    height: '500px', 
                                    width: '100%', 
                                    backgroundColor: 'var(--color-surface) !important',
                                    background: 'var(--color-surface) !important'
                                }}>
                                    <style>
                                        {`
                                        .nivo-bar-container svg {
                                            background: var(--color-surface) !important;
                                            background-color: var(--color-surface) !important;
                                        }
                                        .nivo-bar-container svg rect:first-child {
                                            fill: var(--color-surface) !important;
                                        }
                                        `}
                                    </style>
                                    <ResponsiveBar
                                        data={data}
                                        keys={['value']}
                                        indexBy="id"
                                        margin={{ top: 10, right: 60, bottom: 70, left: 60 }}
                                        padding={0.3}
                                        colors={['var(--color-primary)']}
                                        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                        axisTop={null}
                                        axisRight={null}
                                        enableGridY={true}
                                        enableLabel={true}
                                        label={d => `${d.value}`}
                                        labelTextColor="var(--color-text)"
                                        theme={{
                                            background: 'var(--color-surface)',
                                            text: {
                                                fill: 'var(--color-text)',
                                                fontSize: 12
                                            },
                                            axis: {
                                                domain: {
                                                    line: {
                                                        stroke: 'var(--color-border)',
                                                        strokeWidth: 1
                                                    }
                                                },
                                                ticks: {
                                                    line: {
                                                        stroke: 'var(--color-border)',
                                                        strokeWidth: 1
                                                    },
                                                    text: {
                                                        fill: 'var(--color-text-secondary)',
                                                        fontSize: 12
                                                    }
                                                }
                                            },
                                            grid: {
                                                line: {
                                                    stroke: 'var(--color-border)',
                                                    strokeWidth: 1,
                                                    strokeOpacity: 0.3
                                                }
                                            },
                                            tooltip: {
                                                container: {
                                                    background: 'var(--color-surface)',
                                                    color: 'var(--color-text)',
                                                    border: '1px solid var(--color-border)',
                                                    borderRadius: '8px',
                                                    boxShadow: 'var(--shadow-lg)'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
        </Container>
    )
}