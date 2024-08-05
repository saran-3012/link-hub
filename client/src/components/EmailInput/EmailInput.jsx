import React from 'react';
import './EmailInput.css';

const EmailInput = ({ id, labelName, inputName, onChange, errorMessage}) => {
    return (
        <div className='input-wrapper'>
            <div className={`emailinput ${errorMessage ? 'input-error' : ''}`}>
                <label className='emailinput-label' htmlFor={id}>{labelName}</label>
                <input className='emailinput-input' type="email" name={inputName} id={id} onChange={onChange} placeholder=' ' />
            </div>
            {
                errorMessage !== undefined && <p className='error-msg'>{errorMessage}</p>
            }
        </div>
    )
};

export default EmailInput;