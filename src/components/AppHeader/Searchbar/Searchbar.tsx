import { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { SearchContext } from '../../../utils/SearchContext';
import styles from './Searchbar.module.css';

export default function Searchbar() {
  const [input, setInput] = useState<string>('');
  const searchContext = useContext(SearchContext);

  const { searchGifs } = searchContext;

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { searchGifs(input, true); }
  };

  return (
    <div className={ styles.searchBar }>
      <div className={ styles.searchContainer }>
        <Search size={ 20 } className={ styles.searchIcon }/>
        <input
          type="text"
          placeholder="Search for gifs..."
          value={ input }
          onChange={ (e) => setInput(e.target.value) }
          onKeyDown={ handleEnter }
          className={ styles.searchInput }
        />
        <button 
          onClick={ () => searchGifs(input, true) } 
          className={ styles.searchButton }
          disabled={ !input.trim() }
        >Search</button>
      </div>
    </div>
  );
}