import styles from './styles.module.css'
import DateComponent from '../DateComponent/DateComponent'
import ClimaComponent from '../ClimaComponent/climaComponent'

export default function CardCabecalho() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <DateComponent />
                <div className={styles.welcomeMessage}>
                    Bem-Vindo de volta
                </div>
                <ClimaComponent />
            </div>
        </div>
    )
}