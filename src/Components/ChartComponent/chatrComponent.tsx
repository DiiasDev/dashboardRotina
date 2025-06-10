import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar'


export default function ChartComponent(){
    const data = [
        { id: 'Jan', value: 120 },
        { id: 'Fev', value: 150 },
        { id: 'Mar', value: 90 },
        { id: 'Abr', value: 200 },
        { id: 'Mai', value: 180 },
        { id: 'Jun', value: 160 }
    ];

    return(
        <Container>
            <Grid>
                <Grid>
                    <Card style={{ 
                        height: 520, 
                        width: '100%',
                        maxWidth: 700,
                        backgroundColor: 'var(--color-surface)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        marginTop: '26px'
                    }}>
                        <CardContent style={{ 
                            height: 470, 
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
                                enableLabel={false}
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}