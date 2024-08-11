import React, { useState } from 'react';
import { useContextAPI } from '../../App';
import './EditProfile.css';
import useValidate from '../../hooks/useValidate';
import TextInput from '../TextInput/TextInput';
import Button from '../Buttons/Button';
import appLogoStacked from '../../assets/app-logo-stacked.png';


const EditProfile = () => {
  const { toggleProfileEditMode, loggedUserDetails, setLoggedUserDetails } = useContextAPI();

  const [editedDetails, setEditedDetails] = useState({
    name: loggedUserDetails.name,
    username: loggedUserDetails.username,
    email: loggedUserDetails.email,
    profession: loggedUserDetails.profession,
    bio: loggedUserDetails.bio
  });

  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    if (Object.keys(validationError)?.length) {
      setValidationError({});
    }
    setEditedDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const validationConfig = {
    name: [
      { required: true, message: "Name is required!" },
      { minLength: 5, message: "Name must be atleast 5 characters long" },
      { maxLength: 25, message: "Name must be less than 25 characters" }
    ],
    username: [
      { required: true, message: "User Name is required!" },
      { minLength: 5, message: "User Name must be more than 5 characters" },
      { maxLength: 25, message: "User Name must be less than 25 characters" }
    ],
    email: [
      { required: true, message: "Email is required!" },
      { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Entered email is not valid" }
    ],
    profession: [
      { maxLength: 30, message: "Profession must be less than 30 characters" }
    ],
    bio: [
      { maxLength: 30, message: "Bio must be less than 30 characters" }
    ]
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const [validationResult, hasErrors] = useValidate(editedDetails, validationConfig);
    if (hasErrors) {
      setValidationError(validationResult);
      return;
    }

    const patchUserDetails = {};
    let isEdited = false;

    if(loggedUserDetails.name !== editedDetails.name){
      patchUserDetails.name = editedDetails.name;
      isEdited = true;
    }

    if(loggedUserDetails.username !== editedDetails.username){
      patchUserDetails.username = editedDetails.username;
      isEdited = true;
    }

    if(loggedUserDetails.email !== editedDetails.email){
      patchUserDetails.email = editedDetails.email;
      isEdited = true;
    }

    if(loggedUserDetails.profession !== editedDetails.profession){
      patchUserDetails.profession = editedDetails.profession;
      isEdited = true;
    }

    if(loggedUserDetails.bio !== editedDetails.bio){
      patchUserDetails.bio = editedDetails.bio;
      isEdited = true;
    }

    if(!isEdited){
      toggleProfileEditMode();
      return;
    }

    const url = `${import.meta.env.VITE_API_URL}users/update`;
    const jwtToken = localStorage.getItem('jwt-token');

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify(patchUserDetails)
      });

      const resJson = await res.json();

      if (!res.ok) {
        throw new Error(resJson.message);
      }

      setLoggedUserDetails(resJson.data);
      console.log(resJson.message);
      toggleProfileEditMode();
    }
    catch (err) {
      console.log(err.message)
    }

  };

  return (
    <form className='auth' onSubmit={handleSubmit} autoComplete='off'>
      <h2 className='auth-header'>Edit Profile</h2>
      <div className='auth-container'>
        <div className='auth-form'>
          <TextInput inputName={"name"} labelName={"Name"} id={"editprofile-name"} defaultValue={loggedUserDetails.name} onChange={handleChange} errorMessage={validationError.name} />
          <TextInput inputName={"username"} labelName={"Username"} id={"editprofile-username"} defaultValue={loggedUserDetails.username} onChange={handleChange} errorMessage={validationError.username} />
          <TextInput inputName={"email"} labelName={"Email"} id={"editprofile-email"} defaultValue={loggedUserDetails.email} onChange={handleChange} errorMessage={validationError.email} />
          <TextInput inputName={"profession"} labelName={"Profession/Passion"} id={"editprofile-profession"} defaultValue={loggedUserDetails.profession} onChange={handleChange} errorMessage={validationError.profession} />
          <TextInput inputName={"bio"} labelName={"Bio"} id={"editprofile-bio"} defaultValue={loggedUserDetails.bio} onChange={handleChange} errorMessage={validationError.bio} />
        </div>
        <div className='auth-img_container'>
          <img className='auth-img' src={appLogoStacked} alt="App Logo" />
        </div>
      </div>
      <div className='auth-buttons'>
        <Button buttonName={"Cancel"} className={"cancel-btn"} onClick={toggleProfileEditMode} />
        <Button buttonName={"Update"} buttonType={'submit'} className={"auth-btn"} onClick={handleSubmit} />
      </div>
    </form>
  )
}

export default EditProfile;