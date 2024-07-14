import React from 'react';
import './Card.css';

const Card = ({ linkname, linkurl, linkid, controls }) => {

    const validUrl = linkurl.startsWith('http://') || linkurl.startsWith('https://') ? linkurl : `http://${linkurl}`;

    return (
        <div className='card' id={linkid}>
            <div className='card__line'></div>
            <a className='card__link' href={validUrl} target="_blank" rel="noopener noreferrer">{linkname}</a>
            {
                controls && (
                    <>
                        {/* This should be taken care later */}
                    </>
                )
            }
        </div>
    )
}

export default Card