import React from 'react';
import './Blob.css';

const Blob = ({className}) => {
    return (
        <svg className={`blob ${className? className : ''}`} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="b" gradientTransform="rotate(45 .5 .5)">
                    <stop offset="20%" stopColor="#2cbcff" />
                    <stop offset="100%" stopColor="#55d38d" />
                </linearGradient>
                <clipPath id="a">
                    <path fill="currentColor" d="M625 716.5Q250 933 250 500t375-216.5q375 216.5 0 433Z" />
                </clipPath>
            </defs>
            <g clipPath="url(#a)">
                <path fill="url(#b)" d="M625 716.5Q250 933 250 500t375-216.5q375 216.5 0 433Z" />
            </g>
        </svg>
    )
}

export default Blob;