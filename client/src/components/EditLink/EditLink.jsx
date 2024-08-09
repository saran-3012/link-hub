import React, { useState } from 'react';
import './EditLink.css';
import { useContextAPI } from '../../App';
import TextInput from '../TextInput/TextInput';
import Button from '../Buttons/Button';
import useValidate from '../../hooks/useValidate';

const EditLink = () => {

    const { userLinks, setUserLinks, editLinkDetails, setEditLinkDetails } = useContextAPI();

    const [linkDetails, setLinkDetails] = useState({
        linkname: editLinkDetails.linkname,
        linkurl: editLinkDetails.linkurl
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

    const updateUserLinks = (newLink) => {
        const filteredLinks = userLinks.filter((currLink) => currLink._id !== editLinkDetails._id);
        setUserLinks([...filteredLinks, newLink]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const [validationResult, hasErrors] = useValidate(linkDetails, validationConfig);
        if (hasErrors) {
            setValidationError(validationResult);
            return;
        }

        const url = `${import.meta.env.VITE_API_URL}links/update/${editLinkDetails._id}`;
        const jwtToken = localStorage.getItem('jwt-token');

        try {
            const res = await fetch(url, {
                method: "PATCH",
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

            updateUserLinks(resJson.link);
            console.log(resJson.message);
            setEditLinkDetails({});
        }
        catch (err) {
            console.log(err.message)
        }

    };

    return (
        <form className='editlink' onSubmit={handleSubmit}>
            <h2 className='editlink-header'>Edit Link</h2>
            <div className='editlink-container'>
                <TextInput inputName={"linkname"} labelName={"Link Name"} id={"editlink-linkname"} defaultValue={editLinkDetails.linkname} onChange={handleChange} errorMessage={validationError.linkname} />
                <TextInput inputName={"linkurl"} labelName={"Link URL"} id={"editlink-linkurl"} defaultValue={editLinkDetails.linkurl} onChange={handleChange} errorMessage={validationError.linkurl} />
            </div>
            <div className='editlink-buttons'>
                <Button buttonName={"Cancel"} className={"cancel-btn"} onClick={() => setEditLinkDetails({})} />
                <Button buttonName={"Update"} buttonType={'submit'} className={"auth-btn"} onClick={handleSubmit} />
            </div>
        </form>
    )
}

export default EditLink;