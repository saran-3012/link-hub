import React from 'react';
import './DeleteLink.css';
import { useContextAPI } from '../../App';
import TextInput from '../TextInput/TextInput';
import Button from '../Buttons/Button';

const DeleteLink = () => {
    
    const { userLinks, setUserLinks, deleteLinkDetails, setDeleteLinkDetails, isLoading, setIsLoading } = useContextAPI();

    const updateUserLinks = () => {
        const filteredLinks = userLinks.filter((currLink) => currLink._id !== deleteLinkDetails._id);
        setUserLinks(filteredLinks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `${import.meta.env.VITE_API_URL}links/delete/${deleteLinkDetails._id}`;
        const jwtToken = localStorage.getItem('jwt-token');

        setIsLoading(true);

        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${jwtToken}`
                }
            });

            const resJson = await res.json();

            if (!res.ok) {
                throw new Error(resJson.message);
            }

            updateUserLinks();
            console.log(resJson.message);
            setDeleteLinkDetails({});
        }
        catch (err) {
            console.log(err.message)
        }
        finally{
            setIsLoading(false);
        }

    };

    return (
        <form className='deletelink' onSubmit={handleSubmit}>
            <h2 className='deletelink-header'>Delete Link</h2>
            <div className='deletelink-container'>
                <TextInput inputName={"linkname"} labelName={"Link Name"} id={"deletelink-linkname"} defaultValue={deleteLinkDetails.linkname} disabled />
                <TextInput inputName={"linkurl"} labelName={"Link URL"} id={"deletelink-linkurl"} defaultValue={deleteLinkDetails.linkurl} disabled />
            </div>
            <div className='deletelink-buttons'>
                <Button buttonName={"Cancel"} className={"cancel-btn"} onClick={() => setDeleteLinkDetails({})} />
                <Button buttonName={"Delete"} buttonType={'submit'} className={"auth-btn delete-btn"} onClick={handleSubmit} />
            </div>
        </form>
    )
}

export default DeleteLink;