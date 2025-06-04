import { useState, useEffect } from 'react'
import styles from './styles.module.css'

export default function ClimaComponent() {
    const [temperatura, setTemperatura] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState<string>('')

    const obterIconePeriodo = () => {
        const agora = new Date()
        const hora = agora.getHours()
        // Considera noite entre 18h e 6h
        return hora >= 18 || hora < 6 ? '🌙' : '☀️'
    }

    const buscarClima = async () => {
        try {
            // Usando uma API gratuita que não precisa de chave
            const response = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=-22.9056&longitude=-47.0608&current_weather=true&timezone=America/Sao_Paulo'
            )
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const data = await response.json()
            console.log('Dados da API:', data) // Para debug
            
            const tempCelsius = Math.round(data.current_weather.temperature)
            setTemperatura(tempCelsius)
            setErro('')
        } catch (error) {
            console.error('Erro detalhado:', error)
            setErro(error instanceof Error ? error.message : 'Erro desconhecido')
            setTemperatura(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        buscarClima()
    }, [])

    return (
        <div className={styles.container}>
            <span>
                {loading ? 'Carregando...' : 
                 temperatura !== null ? 
                 `${obterIconePeriodo()} ${temperatura}°` : 
                 `Erro: ${erro}`}
            </span>
        </div>
    )
}