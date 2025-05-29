import { useState } from 'react';
import styles from './styles.module.css';

export default function FormLogin() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Login</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="usuario" className={styles.label}>Usuário</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha..."
            className={styles.input}
            required
          />
        </div>
        
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}