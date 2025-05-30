import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function ToggleTheme() {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || 'light';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    console.log("theme atual: ", newTheme);
  };

  return (
    <button onClick={toggleTheme} className={styles.toggleButton}>
      <span className={styles.icon}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      Mudar tema
    </button>
  );
}
