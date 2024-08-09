import React, { useState } from 'react';
import './PasswordInput.css';
import showPassword from '../../assets/show-password-icon.svg';
import hidePassword from '../../assets/hide-password-icon.svg';

const PasswordInput = ({id, labelName, inputName, defaultValue, onChange, errorMessage}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisiblity = () => { 
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <div className='input-wrapper'>
            <div className={`passwordinput ${errorMessage ? 'input-error' : ''}`}>
                <label className='passwordinput-label' htmlFor={id}>{labelName}</label>
                <input className='passwordinput-input' type={isPasswordVisible? 'text' : 'password'} name={inputName} id={id} defaultValue={defaultValue || ''} onChange={onChange} placeholder=' '/>
                <img className='passwordinput-icon' src={isPasswordVisible? hidePassword : showPassword} alt="Eye" onClick={togglePasswordVisiblity}/>
            </div>
            {
                errorMessage !== undefined && <p className='error-msg'>{errorMessage}</p>
            }
        </div>
    )
}

export default PasswordInput;