import styles from './AppHeader.module.css';

import Searchbar from './Searchbar/Searchbar';
import ThemeToggle from './ThemeToggle/ThemeToggle';

export default function AppHeader() {
  return (
    <>
      <div className={ styles.header }>
        <h1>Giphy Search</h1>
        <Searchbar/>
        <ThemeToggle/>
      </div>
      <div className={ styles.headerSpacer }/>
    </>
    
  );
}