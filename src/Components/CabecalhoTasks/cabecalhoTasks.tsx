import styles from './styles.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CabecalhoTasks() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.tasksTitle}>
                    <h2>Minhas Tasks</h2>
                    <button className={styles.addButton}>+</button>
                </div>
                <div className={styles.filtro}>
                    <div className={styles.dateGroup}>
                        <label>Data início:</label>
                        <DatePicker
                            className={styles.datePicker}
                            dateFormat={"dd/MM/yyyy"}
                            placeholderText='Selecione uma data'
                        />
                    </div>

                    <div className={styles.dateGroup}>
                        <label>Data fim:</label>
                        <DatePicker
                            className={styles.datePicker}
                            dateFormat={"dd/MM/yyyy"}
                            placeholderText='Selecione uma data'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}