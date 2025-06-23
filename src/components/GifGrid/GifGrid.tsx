import { useContext, useState } from 'react';
import { SearchContext, Gif } from '../../utils/SearchContext';
import Popup from './Popup/Popup';
import Loading from '../../utils/Loading';
import styles from './GifGrid.module.css';

export default function GifGrid() {
  const ctx = useContext(SearchContext);
  const { gifs, loading, searchTerm, searchGifs, errorTxt } = ctx;

  const [popupGif, setPopupGif] = useState<Gif | null>(null);

  if (!loading && !errorTxt && gifs.length === 0 && !searchTerm) {
    return <div className={ styles.splashTextContainer }>
      <p>Click the search bar to start searching</p>
    </div>;
  }

  if (errorTxt) {
    return <div className={ styles.loadingContainer }>
      <p>{errorTxt}</p>
    </div>;
  }

  if (loading && gifs.length === 0) {
    return <div className={ styles.loadingContainer }>
      <Loading/>
    </div>;
  }

  if (gifs.length === 0 && searchTerm && !loading) {
    return <div className={ styles.loadingContainer }>
      <p>No results found</p>
    </div>;
  } 

  // open gif in popup
  const handleClick = (gif: Gif) => { setPopupGif(gif); };

  // load more handler
  const handleLoadMore = () => { searchGifs(searchTerm, false); };

  return (
    <>
      <div className={ styles.gifGrid }>
        {gifs.map((gif) => (
          <div key={ gif.id } onClick={ () => handleClick(gif) }>
            <img className={ styles.gridItem } src={ gif.images.fixed_height.url } alt={ gif.title }/>
          </div>
        ))}
      </div>
      
      {gifs.length > 0 && (
        <div className={ styles.loadingContainer }>
          {loading ? (
            <Loading />
          ) : (
            <button 
              onClick={handleLoadMore} 
              disabled={loading}
              className={styles.loadMoreBtn}
            >Load More</button>
          )}
        </div>
      )}
      <Popup gif={ popupGif } setGif={ setPopupGif } />
    </>
  )
} 