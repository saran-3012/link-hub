import React, { useEffect, useRef, useState } from 'react';
import { useContextAPI } from '../../App';
import './Card.css';
import Button from '../Buttons/Button';

const Card = ({ linkDetails, controls }) => {

    const {setEditLinkDetails, setDeleteLinkDetails} = useContextAPI();

    const validUrl = linkDetails.linkurl.startsWith('http://') || linkDetails.linkurl.startsWith('https://') ? linkDetails.linkurl : `http://${linkDetails.linkurl}`;

    const [isCardMenuOpen, setIsCardMenuOpen] = useState(false);

    const cardMenuRef = useRef(null);

    const toggleCardMenu = () => {
        setIsCardMenuOpen((prevState) => !prevState);
    };

    const captureMouseClick = (e) => {
        if(cardMenuRef.current && !cardMenuRef.current.contains(e.target)){
            setIsCardMenuOpen(false);
        }
    };

    const handleEditButtonClick = () => {
        setEditLinkDetails(linkDetails);
        toggleCardMenu();
    };

    const handleDeleteButtonClick = () => {
        setDeleteLinkDetails(linkDetails);
        toggleCardMenu();
    };

    useEffect(() => {
        if(isCardMenuOpen){
            document.addEventListener('click', captureMouseClick);
        }
        else{
            document.removeEventListener('click', captureMouseClick);
        }
    }, [isCardMenuOpen]);

    return (
        <div className='card' id={linkDetails._id}>
            <div className='card__line'></div>
            <a className='card__link' href={validUrl} target="_blank" rel="noopener noreferrer">
                <span className='card__linktext'>{linkDetails.linkname}</span>
            </a>
            {
                controls && (
                    <div className='card__menu' ref={cardMenuRef} >
                        <Button className={'card__menu-btn'} onClick={toggleCardMenu} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="card__menu-icon" >
                                <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                            </svg>
                        </Button>
                        {
                            isCardMenuOpen && 
                            <div className='card__menu-options'>
                                <p className='card__menu-option' onClick={handleEditButtonClick}>Edit</p>
                                <p className='card__menu-option' onClick={handleDeleteButtonClick}>Delete</p>
                            </div>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Card;