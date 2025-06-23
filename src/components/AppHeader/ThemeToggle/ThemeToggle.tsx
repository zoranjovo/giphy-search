import { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../../../utils/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const context = useContext(ThemeContext);
  const { theme, toggleTheme } = context;

  return (
    <button 
      onClick={ toggleTheme } 
      className={ styles.themeToggle }
    >
      {theme === 'light' ? (
        <Moon size={20} className={ styles.icon }/>
      ) : (
        <Sun size={20} className={ styles.icon }/>
      )}
    </button>
  );
}

