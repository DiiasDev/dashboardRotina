import styles from './SavingsModal.module.css'

interface Props {
    isOpen: boolean
    onClose: () => void
    action: 'add' | 'remove'
    onSubmit: (data: any) => void
}

export default function SavingsModal({ isOpen, onClose, action, onSubmit }: Props) {
    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        onSubmit({})
        onClose()
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>
                        {action === 'add' ? '💰 Adicionar Dinheiro' : '💸 Retirar Dinheiro'}
                    </h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>
                
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Valor (R$)</label>
                        <input 
                            type="number" 
                            className={styles.formInput}
                            placeholder="0,00"
                            step="0.01"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Descrição</label>
                        <input 
                            type="text" 
                            className={styles.formInput}
                            placeholder={action === 'add' ? 
                                "Ex: Economia do mês, Sobra do salário..." : 
                                "Ex: Emergência médica, Compra importante..."
                            }
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Data</label>
                        <input type="date" className={styles.formInput} />
                    </div>

                    <div className={styles.modalActions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className={action === 'add' ? styles.saveButton : styles.removeActionButton}
                        >
                            {action === 'add' ? 'Adicionar' : 'Retirar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
