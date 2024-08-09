import React from 'react';
import './TextInput.css';

const TextInput = ({id, labelName, inputName, defaultValue, onChange, errorMessage, disabled}) => {
    return (
        <div className='input-wrapper'>
            <div className={`textinput ${errorMessage ? 'input-error' : ''}`}>
                <label className='textinput-label' htmlFor={id}>{labelName}</label>
                <input className='textinput-input' type="text" name={inputName} id={id} defaultValue={defaultValue || ''} onChange={onChange} placeholder=' ' disabled={disabled || false}/>
            </div>
            {
                errorMessage !== undefined && <p className='error-msg'>{errorMessage}</p>
            }
        </div>
    )
};

export default TextInput;