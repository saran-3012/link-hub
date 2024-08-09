import React, { useState } from 'react';
import './AddLink.css';
import { useContextAPI } from '../../App';
import useValidate from '../../hooks/useValidate';
import TextInput from '../TextInput/TextInput';
import Button from '../Buttons/Button';

const AddLink = () => {

    const { setUserLinks, toggleAddLinkOpen } = useContextAPI();

    const [linkDetails, setLinkDetails] = useState({
        linkname: '',
        linkurl: ''
    });

    const [validationError, setValidationError] = useState({});

    const handleChange = (e) => {
        if (Object.keys(validationError)?.length) {
            setValidationError({});
        }
        setLinkDetails((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const validationConfig = {
        linkname: [
            { required: true, message: "Link Name is required!" },
            { minLength: 3, message: "Link Name must be atleast 3 characters long" },
            { maxLength: 25, message: "Link Name must be less than 25 characters" }
        ],
        linkurl: [
            { required: true, message: "Link URL is required!" },
            { pattern: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/ig, message: "Entered URL is not valid" }
        ]
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const [validationResult, hasErrors] = useValidate(linkDetails, validationConfig);
        if (hasErrors) {
            setValidationError(validationResult);
            return;
        }

        const url = `${import.meta.env.VITE_API_URL}links/create`;
        const jwtToken = localStorage.getItem('jwt-token');

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${jwtToken}`
                },
                body: JSON.stringify(linkDetails)
            });

            const resJson = await res.json();

            if (!res.ok) {
                throw new Error(resJson.message);
            }

            setUserLinks((prevState) => [...prevState, resJson.link]);
            console.log(resJson.message);
            toggleAddLinkOpen();
        }
        catch (err) {
            console.log(err.message)
        }

    };

    return (
        <form className='addlink' onSubmit={handleSubmit}>
            <h2 className='addlink-header'>Add Link</h2>
            <div className='addlink-container'>
                <TextInput inputName={"linkname"} labelName={"Link Name"} id={"addlink-linkname"} onChange={handleChange} errorMessage={validationError.linkname} />
                <TextInput inputName={"linkurl"} labelName={"Link URL"} id={"addlink-linkurl"} onChange={handleChange} errorMessage={validationError.linkurl} />
            </div>
            <div className='addlink-buttons'>
                <Button buttonName={"Cancel"} className={"cancel-btn"} onClick={toggleAddLinkOpen} />
                <Button buttonName={"Create"} buttonType={'submit'} className={"auth-btn"} onClick={handleSubmit} />
            </div>
        </form>
    )
}

export default AddLink;

// Do css for add link popup