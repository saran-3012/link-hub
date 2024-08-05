import React from 'react';
import './Button.css';

const Button = ({ className, buttonName, buttonType, buttonIcon, buttonColor, buttonStyle, onClick, children }) => {
  return (
    <button className={`btn ${className ? className : ''}`} type={buttonType? buttonType : 'button'} style={{ "--btn-clr": buttonColor, flexDirection: buttonStyle === 'reverse' ? 'row-reverse' : 'row' }} onClick={onClick ? onClick : () => {}}>
      {
        buttonIcon && <img className='btn-icon' src={buttonIcon} alt='ButtonIcon' />
      }
      {
        buttonName && <span className='btn-name'>{buttonName}</span>
      }
      {
        children
      }
    </button>
  )
}

export default Button