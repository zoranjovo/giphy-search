import { useState, useEffect } from 'react';
import styles from './Popup.module.css';
import { Check, EllipsisVertical, ExternalLink, Link, X } from 'lucide-react';

export default function Popup({ gif, setGif }: { gif: any; setGif: (newGif: any) => void; }) {
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showAltText, setShowAltText] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // when gif is set, open popup and set to visible
  useEffect(() => {
    if(gif){
      setOpen(true);
      setVisible(true);
      setIsAnimating(false);
    } else {
      setIsAnimating(true);
      setOpen(false);
    }
  }, [gif]);

  const handleAnimationEnd = () => {
    if(!gif && isAnimating){
      setVisible(false);
      setIsAnimating(false);
    }
  };

  // close popup and reset state
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setGif(null);
      setShowAltText(false);
      setIsCopied(false);
    }, 200);
  }

  const handleCopy = async () => {
    try {
      // try clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(gif.images.original.url);
      } else {
        // fallback for odd devices including ios safari
        const textArea = document.createElement('textarea');
        textArea.value = gif.images.original.url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
    } catch (error) {
      console.error('copy gif url error: ', error);
    }
  }

  // dont render if not visible
  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${open ? styles.fadeIn : styles.fadeOut}`} onClick={ handleClose }>
      <div
        className={`${styles.popup} ${gif ? styles.slideIn : styles.slideOut}`}
        onAnimationEnd={ handleAnimationEnd }
        onClick={ (e) => e.stopPropagation() }
      >
        <div className={ styles.content }>
          {gif && (
            <div>
              <div className={ styles.header }>
                <p className={ styles.title }>{gif.title}</p>
                {/* show alt text button if applicable */}
                {gif.alt_text && !showAltText && (
                  <button 
                    className={ styles.altTextBtn }
                    onClick={ () => setShowAltText(true) }
                  >
                    <EllipsisVertical size={20} color='var(--text)'/>
                  </button>
                )}
              </div>
              {gif.alt_text && showAltText && (
                <p className={ styles.altText }>{gif.alt_text}</p>
              )}
              <div className={ styles.gifContainer }>
                <img 
                  className={ styles.gif }
                  src={ gif.images.fixed_height.url } 
                  alt={ gif.title }
                />
              </div>
              
              <div className={ styles.btnContainer }>
                {isCopied ? (
                  <button
                    className={`${styles.btn} ${styles.copied}`}
                    onClick={ handleCopy }
                  >
                    Copied
                    <Check size={20} color='#fff'/>
                  </button>
                ) : (
                  <button
                    className={`${styles.btn} ${styles.copy}`}
                    onClick={ handleCopy }
                  >
                    Copy URL
                    <Link size={20} color='#fff'/>
                  </button>
                )}
                
                <button
                  className={`${styles.btn} ${styles.giphy}`}
                  onClick={ () => window.open(gif.url, '_blank') }
                >
                  Open in GIPHY
                  <ExternalLink size={20} color='#fff'/>
                </button>

                <button
                  className={`${styles.btn} ${styles.close}`}
                  onClick={ handleClose}
                >
                  Close
                  <X size={20} color='#fff'/>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};