import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { GetDate } from '../../logic/date';

export default function DateComponent() {
    const [minhaData] = useState(() => new GetDate());
    const [horaAtual, setHoraAtual] = useState<string>(minhaData.exibeHoras());

    useEffect(() => {
        const interval = setInterval(() => {
            setHoraAtual(minhaData.exibeHoras());
        }, 1000);

        return () => clearInterval(interval);
    }, [minhaData]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.date}>
                    <span>{minhaData.exibeDate()}</span>
                    <span>{horaAtual}</span>
                </div>
            </div>
        </div>
    );
}