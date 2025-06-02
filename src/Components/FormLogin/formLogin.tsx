import { useState } from 'react';
import styles from './styles.module.css';

export default function FormLogin() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [loadingType, setLoadingType] = useState<'success' | 'error'>('success')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userCorrect = 'DiiasDev'
    const passwordCorrect = 'Dias1501'

    if(user === userCorrect && password === passwordCorrect ){
      setLoading(true)
      setLoadingMessage('Logando...')
      setLoadingType('success')
      setTimeout(() => {
        setLoading(false)
        window.location.href = '/homePage';
      }, 3000)
    }else{
      setLoading(true)
      setLoadingMessage('Usuário ou senha errado...')
      setLoadingType('error')
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }

    console.log('User digitado:', user)
    console.log('Password digitado:', password)
  };

  return (
    <div className={styles.formContainer}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={`${styles.loadingModal} ${styles[loadingType]}`}>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}></div>
            </div>
            <p className={styles.loadingText}>{loadingMessage}</p>
          </div>
        </div>
      )}
      
      <h1 className={styles.title}>Login</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="usuario" className={styles.label}>Usuário</label>
          <input
            type="text"
            id="usuario"
            value={user}
            onChange={e => setUser(e.target.value)}
            placeholder="Digite seu usuário..."
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="senha" className={styles.label}>Senha</label>
          <input
            type="password"
            id="senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Digite sua senha..."
            className={styles.input}
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit} className={styles.button} disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}