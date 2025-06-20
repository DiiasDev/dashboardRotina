
export const localStorageManager = {
    setItem: (key: string, value: any) => {
        try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
            localStorage.setItem(key, stringValue)
            
            // Disparar evento customizado para notificar componentes
            window.dispatchEvent(new CustomEvent('localStorageUpdated', {
                detail: { key, value }
            }))
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error)
        }
    },

    getItem: (key: string) => {
        try {
            return localStorage.getItem(key)
        } catch (error) {
            console.error('Erro ao ler do localStorage:', error)
            return null
        }
    },

    removeItem: (key: string) => {
        try {
            localStorage.removeItem(key)
            window.dispatchEvent(new CustomEvent('localStorageUpdated', {
                detail: { key, value: null }
            }))
        } catch (error) {
            console.error('Erro ao remover do localStorage:', error)
        }
    }
}
