import { useState } from "react"
import styles from "./style.module.css"

export default function FinanceiroPage() {
    const [showTransactionModal, setShowTransactionModal] = useState(false)
    const [showSavingsModal, setShowSavingsModal] = useState(false)
    const [savingsAction, setSavingsAction] = useState<'add' | 'remove'>('add')

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Controle Financeiro</h1>
                <p className={styles.pageSubtitle}>Gerencie suas finanças e acompanhe seus gastos</p>
            </div>

            {/* Cards de Resumo */}
            <div className={styles.summaryCards}>
                <div className={`${styles.card} ${styles.incomeCard}`}>
                    <div className={styles.cardIcon}>💰</div>
                    <div className={styles.cardContent}>
                        <h3>Receita Total</h3>
                        <p className={styles.cardValue}>R$ 5.250,00</p>
                        <span className={styles.cardChange}>+2,5% este mês</span>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.expenseCard}`}>
                    <div className={styles.cardIcon}>💸</div>
                    <div className={styles.cardContent}>
                        <h3>Gastos Totais</h3>
                        <p className={styles.cardValue}>R$ 3.890,00</p>
                        <span className={styles.cardChange}>-1,2% este mês</span>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.balanceCard}`}>
                    <div className={styles.cardIcon}>📊</div>
                    <div className={styles.cardContent}>
                        <h3>Saldo Atual</h3>
                        <p className={styles.cardValue}>R$ 1.360,00</p>
                        <span className={styles.cardChange}>+8,3% este mês</span>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.savingsCard}`}>
                    <div className={styles.cardIcon}>🎯</div>
                    <div className={styles.cardContent}>
                        <h3>Meta de Economia</h3>
                        <p className={styles.cardValue}>68%</p>
                        <span className={styles.cardChange}>R$ 680 de R$ 1.000</span>
                    </div>
                </div>
            </div>

            <div className={styles.mainContent}>
                {/* Seção de Dinheiro Guardado */}
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>💰 Dinheiro Guardado</h2>
                        <div className={styles.savingsActions}>
                            <button 
                                className={styles.addButton}
                                onClick={() => {
                                    setSavingsAction('add')
                                    setShowSavingsModal(true)
                                }}
                            >
                                + Adicionar
                            </button>
                            <button 
                                className={styles.removeButton}
                                onClick={() => {
                                    setSavingsAction('remove')
                                    setShowSavingsModal(true)
                                }}
                            >
                                - Retirar
                            </button>
                        </div>
                    </div>
                    
                    <div className={styles.savingsOverview}>
                        <div className={styles.savingsCard}>
                            <div className={styles.savingsIcon}>🏦</div>
                            <div className={styles.savingsContent}>
                                <h3>Total Guardado</h3>
                                <p className={styles.savingsValue}>R$ 3.450,00</p>
                                <span className={styles.savingsChange}>+R$ 200,00 este mês</span>
                            </div>
                        </div>

                        <div className={styles.savingsCard}>
                            <div className={styles.savingsIcon}>🎯</div>
                            <div className={styles.savingsContent}>
                                <h3>Meta Anual</h3>
                                <p className={styles.savingsValue}>R$ 10.000,00</p>
                                <span className={styles.savingsProgress}>34,5% atingido</span>
                            </div>
                        </div>

                        <div className={styles.savingsCard}>
                            <div className={styles.savingsIcon}>📈</div>
                            <div className={styles.savingsContent}>
                                <h3>Média Mensal</h3>
                                <p className={styles.savingsValue}>R$ 287,50</p>
                                <span className={styles.savingsChange}>+R$ 50,00 vs. meta</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção de Gastos por Categoria */}
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Gastos por Categoria</h2>
                        <button 
                            className={styles.addButton}
                            onClick={() => setShowTransactionModal(true)}
                        >
                            + Adicionar Transação
                        </button>
                    </div>
                    
                    <div className={styles.categoryGrid}>
                        <div className={styles.categoryCard}>
                            <div className={styles.categoryIcon}>🏠</div>
                            <h4>Moradia</h4>
                            <p className={styles.categoryAmount}>R$ 1.200,00</p>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{width: '60%'}}></div>
                            </div>
                            <span className={styles.categoryPercent}>60% do orçamento</span>
                        </div>

                        <div className={styles.categoryCard}>
                            <div className={styles.categoryIcon}>🍽️</div>
                            <h4>Alimentação</h4>
                            <p className={styles.categoryAmount}>R$ 650,00</p>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{width: '45%'}}></div>
                            </div>
                            <span className={styles.categoryPercent}>45% do orçamento</span>
                        </div>

                        <div className={styles.categoryCard}>
                            <div className={styles.categoryIcon}>🚗</div>
                            <h4>Transporte</h4>
                            <p className={styles.categoryAmount}>R$ 340,00</p>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{width: '85%'}}></div>
                            </div>
                            <span className={styles.categoryPercent}>85% do orçamento</span>
                        </div>

                        <div className={styles.categoryCard}>
                            <div className={styles.categoryIcon}>🎮</div>
                            <h4>Lazer</h4>
                            <p className={styles.categoryAmount}>R$ 180,00</p>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{width: '30%'}}></div>
                            </div>
                            <span className={styles.categoryPercent}>30% do orçamento</span>
                        </div>

                        <div className={styles.categoryCard}>
                            <div className={styles.categoryIcon}>💊</div>
                            <h4>Saúde</h4>
                            <p className={styles.categoryAmount}>R$ 220,00</p>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{width: '55%'}}></div>
                            </div>
                            <span className={styles.categoryPercent}>55% do orçamento</span>
                        </div>

                        <div className={styles.categoryCard}>
                            <div className={styles.categoryIcon}>👕</div>
                            <h4>Vestuário</h4>
                            <p className={styles.categoryAmount}>R$ 120,00</p>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{width: '20%'}}></div>
                            </div>
                            <span className={styles.categoryPercent}>20% do orçamento</span>
                        </div>
                    </div>
                </div>

                {/* Seção de Gráfico e Transações Recentes */}
                <div className={styles.chartsSection}>
                    <div className={styles.chartCard}>
                        <h3>Evolução Mensal</h3>
                        <div className={styles.chartPlaceholder}>
                            <div className={styles.chartBars}>
                                <div className={styles.bar} style={{height: '60%'}}><span>Jan</span></div>
                                <div className={styles.bar} style={{height: '75%'}}><span>Fev</span></div>
                                <div className={styles.bar} style={{height: '45%'}}><span>Mar</span></div>
                                <div className={styles.bar} style={{height: '80%'}}><span>Abr</span></div>
                                <div className={styles.bar} style={{height: '90%'}}><span>Mai</span></div>
                                <div className={styles.bar} style={{height: '85%'}}><span>Jun</span></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.transactionsCard}>
                        <h3>Transações Recentes</h3>
                        <div className={styles.transactionsList}>
                            <div className={styles.transaction}>
                                <div className={styles.transactionIcon}>🛒</div>
                                <div className={styles.transactionDetails}>
                                    <p className={styles.transactionName}>Supermercado</p>
                                    <span className={styles.transactionDate}>Hoje, 14:30</span>
                                </div>
                                <span className={styles.transactionAmount}>-R$ 85,40</span>
                            </div>

                            <div className={styles.transaction}>
                                <div className={styles.transactionIcon}>⛽</div>
                                <div className={styles.transactionDetails}>
                                    <p className={styles.transactionName}>Posto de Gasolina</p>
                                    <span className={styles.transactionDate}>Ontem, 18:45</span>
                                </div>
                                <span className={styles.transactionAmount}>-R$ 120,00</span>
                            </div>

                            <div className={styles.transaction}>
                                <div className={styles.transactionIcon}>💼</div>
                                <div className={styles.transactionDetails}>
                                    <p className={styles.transactionName}>Salário</p>
                                    <span className={styles.transactionDate}>01/11, 08:00</span>
                                </div>
                                <span className={`${styles.transactionAmount} ${styles.income}`}>+R$ 4.500,00</span>
                            </div>

                            <div className={styles.transaction}>
                                <div className={styles.transactionIcon}>📱</div>
                                <div className={styles.transactionDetails}>
                                    <p className={styles.transactionName}>Conta de Celular</p>
                                    <span className={styles.transactionDate}>30/10, 10:15</span>
                                </div>
                                <span className={styles.transactionAmount}>-R$ 45,90</span>
                            </div>

                            <div className={styles.transaction}>
                                <div className={styles.transactionIcon}>🍕</div>
                                <div className={styles.transactionDetails}>
                                    <p className={styles.transactionName}>Delivery</p>
                                    <span className={styles.transactionDate}>29/10, 20:30</span>
                                </div>
                                <span className={styles.transactionAmount}>-R$ 32,50</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção de Metas e Relatórios */}
                <div className={styles.goalsSection}>
                    <div className={styles.goalsCard}>
                        <h3>Metas Financeiras</h3>
                        <div className={styles.goalsList}>
                            <div className={styles.goalItem}>
                                <div className={styles.goalInfo}>
                                    <h4>Fundo de Emergência</h4>
                                    <p>R$ 2.400 de R$ 5.000</p>
                                </div>
                                <div className={styles.goalProgress}>
                                    <div className={styles.goalBar}>
                                        <div className={styles.goalFill} style={{width: '48%'}}></div>
                                    </div>
                                    <span>48%</span>
                                </div>
                            </div>

                            <div className={styles.goalItem}>
                                <div className={styles.goalInfo}>
                                    <h4>Viagem de Férias</h4>
                                    <p>R$ 800 de R$ 2.000</p>
                                </div>
                                <div className={styles.goalProgress}>
                                    <div className={styles.goalBar}>
                                        <div className={styles.goalFill} style={{width: '40%'}}></div>
                                    </div>
                                    <span>40%</span>
                                </div>
                            </div>

                            <div className={styles.goalItem}>
                                <div className={styles.goalInfo}>
                                    <h4>Novo Computador</h4>
                                    <p>R$ 1.200 de R$ 3.500</p>
                                </div>
                                <div className={styles.goalProgress}>
                                    <div className={styles.goalBar}>
                                        <div className={styles.goalFill} style={{width: '34%'}}></div>
                                    </div>
                                    <span>34%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.reportsCard}>
                        <h3>Relatórios Rápidos</h3>
                        <div className={styles.reportsList}>
                            <div className={styles.reportItem}>
                                <div className={styles.reportIcon}>📈</div>
                                <div className={styles.reportContent}>
                                    <h4>Análise Mensal</h4>
                                    <p>Comparativo de gastos e receitas</p>
                                </div>
                                <button className={styles.reportButton}>Ver</button>
                            </div>

                            <div className={styles.reportItem}>
                                <div className={styles.reportIcon}>🎯</div>
                                <div className={styles.reportContent}>
                                    <h4>Categorias Críticas</h4>
                                    <p>Categorias que excederam o orçamento</p>
                                </div>
                                <button className={styles.reportButton}>Ver</button>
                            </div>

                            <div className={styles.reportItem}>
                                <div className={styles.reportIcon}>💡</div>
                                <div className={styles.reportContent}>
                                    <h4>Sugestões de Economia</h4>
                                    <p>Dicas para reduzir gastos</p>
                                </div>
                                <button className={styles.reportButton}>Ver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para Adicionar Transação */}
            {showTransactionModal && (
                <div className={styles.modalOverlay} onClick={() => setShowTransactionModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Adicionar Transação</h3>
                            <button 
                                className={styles.closeButton}
                                onClick={() => setShowTransactionModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <form className={styles.modalForm}>
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
                                <input 
                                    type="date" 
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button 
                                    type="button" 
                                    className={styles.cancelButton}
                                    onClick={() => setShowTransactionModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.saveButton}>
                                    Salvar Transação
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para Dinheiro Guardado */}
            {showSavingsModal && (
                <div className={styles.modalOverlay} onClick={() => setShowSavingsModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>
                                {savingsAction === 'add' ? '💰 Adicionar Dinheiro' : '💸 Retirar Dinheiro'}
                            </h3>
                            <button 
                                className={styles.closeButton}
                                onClick={() => setShowSavingsModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <form className={styles.modalForm}>
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
                                    placeholder={savingsAction === 'add' ? 
                                        "Ex: Economia do mês, Sobra do salário..." : 
                                        "Ex: Emergência médica, Compra importante..."
                                    }
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Data</label>
                                <input 
                                    type="date" 
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button 
                                    type="button" 
                                    className={styles.cancelButton}
                                    onClick={() => setShowSavingsModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className={savingsAction === 'add' ? styles.saveButton : styles.removeActionButton}
                                >
                                    {savingsAction === 'add' ? 'Adicionar' : 'Retirar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}