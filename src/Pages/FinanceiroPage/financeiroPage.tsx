import { useState, useEffect } from "react"
import styles from "./style.module.css"
import SummaryCards from "../../Components/SummaryCards/SummaryCards"
import SavingsSection from "../../Components/SavingsSection/SavingsSection"
import CategoryGrid from "../../Components/CategoryGrid/CategoryGrid"
import ChartsSection from "../../Components/ChartsSection/ChartsSection"
import GoalsSection from "../../Components/GoalsSection/GoalsSection"
import TransactionModal from "../../Components/TransactionModal/TransactionModal"
import SavingsModal from "../../Components/SavingsModal/SavingsModal"

export default function FinanceiroPage() {
    const [showTransactionModal, setShowTransactionModal] = useState(false)
    const [showSavingsModal, setShowSavingsModal] = useState(false)
    const [savingsAction, setSavingsAction] = useState<'add' | 'remove'>('add')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const summaryData = {
        income: 5250,
        expenses: 3890,
        balance: 1360,
        savingsProgress: 68,
        savingsAmount: 680,
        savingsGoal: 1000,
        totalSaved: 3450,
        monthlyAverage: 287.50,
        annualGoal: 10000
    }

    const categories = [
        { id: '1', icon: '🏠', name: 'Moradia', amount: 1200, percentage: 60 },
        { id: '2', icon: '🍽️', name: 'Alimentação', amount: 650, percentage: 45 },
        { id: '3', icon: '🚗', name: 'Transporte', amount: 340, percentage: 85 },
        { id: '4', icon: '🎮', name: 'Lazer', amount: 180, percentage: 30 },
        { id: '5', icon: '💊', name: 'Saúde', amount: 220, percentage: 55 },
        { id: '6', icon: '👕', name: 'Vestuário', amount: 120, percentage: 20 }
    ]

    const transactions = [
        { id: '1', icon: '🛒', name: 'Supermercado', date: 'Hoje, 14:30', amount: 85.40 },
        { id: '2', icon: '⛽', name: 'Posto de Gasolina', date: 'Ontem, 18:45', amount: 120.00 },
        { id: '3', icon: '💼', name: 'Salário', date: '01/11, 08:00', amount: 4500.00, isIncome: true },
        { id: '4', icon: '📱', name: 'Conta de Celular', date: '30/10, 10:15', amount: 45.90 },
        { id: '5', icon: '🍕', name: 'Delivery', date: '29/10, 20:30', amount: 32.50 }
    ]

    const goals = [
        { 
            id: '1', 
            title: 'Fundo de Emergência', 
            current: 2400, 
            target: 5000,
            color: '#10B981',
            percentage: 48,
            description: 'R$ 2.400 de R$ 5.000'
        },
        { 
            id: '2', 
            title: 'Viagem de Férias', 
            current: 800, 
            target: 2000,
            color: '#10B981',
            percentage: 40,
            description: 'R$ 800 de R$ 2.000'
        },
        { 
            id: '3', 
            title: 'Novo Computador', 
            current: 1200, 
            target: 3500,
            color: '#10B981',
            percentage: 34,
            description: 'R$ 1.200 de R$ 3.500'
        }
    ]

    const reports = [
        { id: '1', icon: '📈', title: 'Análise Mensal', description: 'Comparativo de gastos e receitas' },
        { id: '2', icon: '🎯', title: 'Categorias Críticas', description: 'Categorias que excederam o orçamento' },
        { id: '3', icon: '💡', title: 'Sugestões de Economia', description: 'Dicas para reduzir gastos' }
    ]

    const handleAddSavings = () => {
        setSavingsAction('add')
        setShowSavingsModal(true)
    }

    const handleRemoveSavings = () => {
        setSavingsAction('remove')
        setShowSavingsModal(true)
    }

    const handleTransactionSubmit = (data: any) => {
        console.log('Transaction submitted:', data)
    }

    const handleSavingsSubmit = (data: any) => {
        console.log('Savings submitted:', data)
    }

    useEffect(() => {
        const handleSidebarToggle = (event: CustomEvent) => {
            setSidebarCollapsed(event.detail.collapsed);
        };

        window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
        
        return () => {
            window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
        };
    }, []);

    return (
        <div className={`${styles.container} ${sidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Controle Financeiro</h1>
                <p className={styles.pageSubtitle}>Gerencie suas finanças e acompanhe seus gastos</p>
            </div>

            <SummaryCards data={summaryData} />

            <div className={styles.mainContent}>
                <SavingsSection 
                    onAddSavings={handleAddSavings}
                    onRemoveSavings={handleRemoveSavings}
                />

                <CategoryGrid 
                    categories={categories}
                    onAddTransaction={() => setShowTransactionModal(true)}
                />

                <ChartsSection transactions={transactions} />

                <GoalsSection goals={goals} reports={reports} />
            </div>

            <TransactionModal
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSubmit={handleTransactionSubmit}
            />

            <SavingsModal
                isOpen={showSavingsModal}
                onClose={() => setShowSavingsModal(false)}
                action={savingsAction}
                onSubmit={handleSavingsSubmit}
            />
        </div>
    )
}