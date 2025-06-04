import styles from './styles.module.css'

type StatusType = 'iniciado' | 'pausado' | 'parado';

interface ProjetoCardProps {
    nome?: string;
    percentual?: number;
    status?: StatusType;
}

const statusLabels: Record<StatusType, string> = {
    iniciado: 'Iniciado',
    pausado: 'Pausado',
    parado: 'Parado'
};

export default function CardProjetos({
    nome = "Asha",
    percentual = 48,
    status = "pausado"
}: ProjetoCardProps) {
    return (
        <div className={styles.cardProjeto}>
            <div className={styles.header}>
                <span className={styles.nomeProjeto}>{nome}</span>
                <span className={styles.percentual}>{percentual}%</span>
            </div>
            <div className={styles.progressBarContainer}>
                <div
                    className={`${styles.progressBar} ${styles[status]}`}
                    style={{ width: `${percentual}%` }}
                />
            </div>
            <div className={styles.statusContainer}>
                <span className={`${styles.status} ${styles[status]}`}>
                    {statusLabels[status]}
                </span>
            </div>
        </div>
    );
}