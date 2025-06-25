import styles from './TransactionModal.module.css'

interface Props {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => void
}

export default function TransactionModal({ isOpen, onClose, onSubmit }: Props) {
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
                    <h3>Adicionar Transação</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>
                
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Tipo de Transação</label>
                        <select className={styles.formSelect}>
                            <option value="expense">💸 Gasto</option>
                            <option value="income">💰 Receita</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Descrição</label>
                        <input 
                            type="text" 
                            className={styles.formInput}
                            placeholder="Ex: Salário, Supermercado, Gasolina..."
                        />
                    </div>

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
                        <label>Categoria</label>
                        <select className={styles.formSelect}>
                            <option value="">Selecione uma categoria</option>
                            <option value="moradia">🏠 Moradia</option>
                            <option value="alimentacao">🍽️ Alimentação</option>
                            <option value="transporte">🚗 Transporte</option>
                            <option value="lazer">🎮 Lazer</option>
                            <option value="saude">💊 Saúde</option>
                            <option value="vestuario">👕 Vestuário</option>
                            <option value="salario">💼 Salário</option>
                            <option value="freelance">💻 Freelance</option>
                            <option value="outros">📋 Outros</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Data</label>
                        <input type="date" className={styles.formInput} />
                    </div>

                    <div className={styles.modalActions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.saveButton}>
                            Salvar Transação
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
