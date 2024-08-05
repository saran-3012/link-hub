import React from 'react';
import { createPortal } from 'react-dom';
import './Popup.css';
import { useContextAPI } from '../../App';


const Popup = ({ popupToggle, children }) => {

  const { isDarkTheme } = useContextAPI();

  return createPortal(
    <div className={`popup ${isDarkTheme ? 'dark-theme' : ''}`} onClick={popupToggle}>
      <div className='popup__wrapper' onClick={(e) => e.stopPropagation()}>
        {
          children
        }
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default Popup;