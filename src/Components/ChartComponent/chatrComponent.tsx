import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar'
import { useState, useEffect } from 'react'
import {ChartData} from '../../logic/chartData'


export default function ChartComponent(){
    const [data, setData] = useState<{id: string, value: number}[]>([])

    const updateChartData = () => {
        const chartData = new ChartData("", 0)
        const newData = chartData.data()
        setData(newData)
    }

    useEffect(() => {
        updateChartData()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'tasks_criadas' || e.key === null) {
                updateChartData()
            }
        }

        const handleCustomStorageChange = (e: CustomEvent) => {
            if (e.detail?.key === 'tasks_criadas') {
                updateChartData()
            }
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('localStorageUpdated', handleCustomStorageChange as EventListener)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('localStorageUpdated', handleCustomStorageChange as EventListener)
        }
    }, [])
    
    return(
        <Container>
            <Grid>
                <Grid>
                    <Card style={{ 
                        height: 650, 
                        width: '100%',
                        maxWidth: 1200,
                        backgroundColor: 'var(--color-surface)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        marginTop: '26px'
                    }}>
                        <CardContent style={{ 
                            height: 580, 
                            width: '100%',
                            backgroundColor: 'var(--color-surface)'
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
                                <ResponsiveBar
                                    data={data}
                                    keys={['value']}
                                    indexBy="id"
                                    margin={{ top: 10, right: 60, bottom: 70, left: 60 }}
                                    padding={0.3}
                                    colors={['#7c3aed']}
                                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                    axisTop={null}
                                    axisRight={null}
                                    enableGridY={true}
                                    enableLabel={true}
                                    label={d => `${d.value}`}
                                    labelTextColor="white"
                                    theme={{
                                        background: 'var(--color-surface)',
                                        text: {
                                            fill: 'var(--color-text)'
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
                                                strokeOpacity: 0.5
                                            }
                                        }
                                    }}
                                />
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}