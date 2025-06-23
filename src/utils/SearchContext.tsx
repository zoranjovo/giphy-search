import { createContext, useState, ReactNode } from 'react';
import GiphyAxios from './GiphyAxios';

export interface Gif {
  id: string;
  alt_text: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

interface SearchContextType {
  searchTerm: string;
  gifs: Gif[];
  loading: boolean;
  searchGifs: (term: string, scroll: boolean) => void;
  errorTxt: string | null;
}

const GIFS_PER_BATCH = 20;

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [errorTxt, setErrorTxt] = useState<string | null>(null);

  // fetch gifs from giphy api
  const searchGifs = async (term: string, initial: boolean) => {
    setErrorTxt(null);
    let thisOffset = currentOffset;
    setLoading(true);
    setSearchTerm(term);
    // if not initial search (load more btn), increment the offset
    if(initial){
      thisOffset = 0;
    } else {
      thisOffset += 1;
    }
    setCurrentOffset(thisOffset);
    try {
      const response = await GiphyAxios.get('/gifs/search', {
        params: {
          q: term,
          limit: GIFS_PER_BATCH,
          offset: GIFS_PER_BATCH * thisOffset,
        }
      });
      if(initial){
        setGifs(response.data.data);
      } else {
        // sometimes the same gif is returned twice, so filter out duplicates by gif id
        setGifs(prev => [...prev, ...response.data.data.filter(gif => !prev.some(existing => existing.id === gif.id))]);
      }
    } catch (error) {
      console.error('error: ', error);
      // display error message
      setErrorTxt('Error fetching GIFs');
      setGifs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider value={{ searchTerm, gifs, loading, searchGifs, errorTxt }}>
      {children}
    </SearchContext.Provider>
  );
} 