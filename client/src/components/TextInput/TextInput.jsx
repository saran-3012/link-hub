import React from 'react';
import './TextInput.css';

const TextInput = ({id, labelName, inputName, onChange, errorMessage}) => {
    return (
        <div className='input-wrapper'>
            <div className={`textinput ${errorMessage ? 'input-error' : ''}`}>
                <label className='textinput-label' htmlFor={id}>{labelName}</label>
                <input className='textinput-input' type="text" name={inputName} id={id} onChange={onChange} placeholder=' '/>
            </div>
            {
                errorMessage !== undefined && <p className='error-msg'>{errorMessage}</p>
            }
        </div>
    )
};

export default TextInput;