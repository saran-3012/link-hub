import React, { useState } from 'react';
import './SignIn.css';
import { useContextAPI } from '../../App';
import TextInput from '../TextInput/TextInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../Buttons/Button';
import appLogoStacked from '../../assets/app-logo-stacked.png';

const SignIn = () => {
  const { toggleSignin, switchAuth, setLoggedUserDetails } = useContextAPI();

  const [signinDetails, setSigninDetails] = useState({
    username: '',
    password: ''
  });

  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    if(Object.keys(validationError)?.length){
      setValidationError({});
    }
    setSigninDetails((prevState) => {
      return {...prevState, [e.target.name]: e.target.value};
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}users/login`;
    
    try{
      const res = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signinDetails)
      });
  
      const resJson = await res.json();

      if(res.status === 404){
        setValidationError({"username": "Username not found!"});
        throw new Error(resJson.message);
      }

      if(res.status === 401){
        setValidationError({"password": "Password is Invalid"});
        throw new Error(resJson.message);
      }

      if(!res.ok){
        throw new Error(resJson.message);
      }

      localStorage.setItem('jwt-token', resJson.token);
      setLoggedUserDetails(resJson.data);
      console.log(resJson.message);
      toggleSignin();
    }
    catch(err){
      console.log(err.message)
    }

  };

  return (
    <form className='auth' onSubmit={handleSubmit} autoComplete='off'>
      <h2 className='auth-header'>SIGN IN</h2>
      <div className='auth-container'>
        <div className='auth-form'>
          <TextInput inputName={"username"} labelName={"Username/Email"} id={"signin-username-email"} onChange={handleChange} errorMessage={validationError.username}/>
          <PasswordInput inputName={"password"} labelName={"Password"} id={"signin-password"} onChange={handleChange} errorMessage={validationError.password}/>
          <p className='auth-switch-text'>Don't have an account? <span className='auth-switch' onClick={switchAuth}>Register</span></p>
          <div className='auth-buttons'>
            <Button buttonName={"Cancel"} className={"cancel-btn"} onClick={toggleSignin} />
            <Button buttonName={"Login"} buttonType={'submit'} className={"auth-btn"} onClick={handleSubmit}/>
          </div>
        </div>
        <div className='auth-img_container'>
          <img className='auth-img' src={appLogoStacked} alt="App Logo" />
        </div>
      </div>

    </form>
  )
}

export default SignIn;