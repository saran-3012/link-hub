import React from 'react';
import './Loader.css';
import { createPortal } from 'react-dom';

const Loader = () => {
    return createPortal(
        <div className='loader-container'>
            <div className="loader-wrapper">
                <svg viewBox="22 22 44 44" className="loader-svg">
                    <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" className="loader-circle"></circle>
                </svg>
            </div>
        </div>
        ,
        document.getElementById('loader')
    )
}

export default Loader;