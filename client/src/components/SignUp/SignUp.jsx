import React, { useEffect, useState } from 'react';
import { useContextAPI } from '../../App';
import useValidate from '../../hooks/useValidate';
import TextInput from '../TextInput/TextInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../Buttons/Button';
import appLogoStacked from '../../assets/app-logo-stacked.png';

const SignUp = () => {
  const { toggleSignup, switchAuth, setLoggedUserDetails } = useContextAPI();

  const [signupDetails, setSignupDetails] = useState({
    name:'',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    if(Object.keys(validationError)?.length){
      setValidationError({});
    }
    setSignupDetails((prevState) => {
      return {...prevState, [e.target.name]: e.target.value};
    });
  };

  const validationConfig = {
    name: [
      {required: true, message: "Name is required!"},
      {minLength: 5, message: "Name must be atleast 5 characters long"},
      {maxLength: 25, message: "Name must be less than 25 characters"}
    ],
    username: [
      {required: true, message: "User Name is required!"},
      {minLength: 5, message: "User Name must be more than 5 characters"},
      {maxLength: 25, message: "User Name must be less than 25 characters"}
    ],
    email: [
      {required: true, message: "Email is required!"},
      {pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Entered email is not valid"}
    ],
    password: [
      {required: true, message: "Password is required!"},
      {minLength: 8, message: "Password length must be atleast 8 characters long"}, 
      {validatePassword: true, minUppercase: 1, minLowercase: 1, minDigit: 1, minSpecialCharacter: 1, message: "Entered password is not valid"}
    ],
    confirmPassword: [
      {required: true, message: "Password is required!"},
      {minLength: 8, message: "Password length must be atleast 8 characters long"}, 
      {validatePassword: true, minUppercase: 1, minLowercase: 1, minDigit: 1, minSpecialCharacter: 1, message: "Entered password is not valid"}
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [validationResult, hasErrors] = useValidate(signupDetails, validationConfig);
    if(hasErrors){
      setValidationError(validationResult);
      return;
    }

    if(signupDetails?.password !== signupDetails?.confirmPassword){
      setValidationError({confirmPassword: "Password does not match!"});
      return;
    }

    const url = `${import.meta.env.VITE_API_URL}users/register`;
    
    try{
      const res = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: signupDetails?.name, 
          username: signupDetails?.username, 
          email: signupDetails?.email, 
          password: signupDetails?.password
        })
      });
  
      const resJson = await res.json();

      if(res.status === 409){
        const errorKey = resJson.message?.split(' ')[0]?.toLowerCase();
        setValidationError({[errorKey]: resJson.message});
        throw new Error(resJson.message);
      }

      if(!res.ok){
        throw new Error(resJson.message);
      }

      localStorage.setItem('jwt-token', resJson.token);
      setLoggedUserDetails(resJson.data);
      console.log(resJson.message);
      toggleSignup();
    }
    catch(err){
      console.log(err.message)
    }

  };


  return (
    <form className='auth' onSubmit={handleSubmit} autoComplete='off'>
      <h2 className='auth-header'>SIGN UP</h2>
      <div className='auth-container'>
        <div className='auth-form'>
          <TextInput inputName={"name"} labelName={"Name"} id={"signup-name"} onChange={handleChange} errorMessage={validationError.name}/>
          <TextInput inputName={"username"} labelName={"Username"} id={"signup-username"} onChange={handleChange} errorMessage={validationError.username}/>
          <TextInput inputName={"email"} labelName={"Email"} id={"signup-email"} onChange={handleChange} errorMessage={validationError.email}/>
          <PasswordInput inputName={"password"} labelName={"Password"} id={"signup-password"} onChange={handleChange} errorMessage={validationError.password}/>
          <PasswordInput inputName={"confirmPassword"} labelName={"Confirm Password"} id={"signup-confirm-password"} onChange={handleChange} errorMessage={validationError.confirmPassword}/>
        </div>
        <div className='auth-img_container'>
          <img className='auth-img' src={appLogoStacked} alt="App Logo" />
          <p className='auth-switch-text'>Already have an account? <span className='auth-switch' onClick={switchAuth}>Login</span></p>
        </div>
      </div>
      <div className='auth-buttons'>
        <Button buttonName={"Cancel"} className={"cancel-btn"} onClick={toggleSignup} />
        <Button buttonName={"Register"} buttonType={'submit'} className={"auth-btn"} onClick={handleSubmit}/>
      </div>
    </form>
  )
}

export default SignUp;