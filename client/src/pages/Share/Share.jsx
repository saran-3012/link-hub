import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContextAPI } from '../../App';
import './Share.css';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';

const Share = () => {

    const {isDarkTheme, isLoading, setIsLoading} = useContextAPI();

    const {username} = useParams();

    const [links, setLinks] = useState([]);
    const [error, setError] = useState(null);
    const [ownerDetails, setOwnerDetails] = useState({
        name: '',
        bio: '',
        profession: ''
    });
    const [ownerName, setOwnerName] = useState('');
    const [ownerBio, setOwnerBio] = useState('');
    const [ownerProfession, setOwnerProfession] = useState('');

    const fetchLinks = async (url) => {

        setIsLoading(true);
        try{
            const res = await fetch(url);
            const resJson = await res.json();
            if(res.status === 404){
                throw new Error("User not found!");
            }
            if(!res.ok ){
                throw new Error("Something went wrong!")
            }

            setLinks(resJson.data);
            setOwnerDetails(resJson.user);
            localStorage.setItem(`viewed:${username}`, 'true');
        }
        catch(err){
            if(err?.message === "Failed to fetch"){
                setError("Something Went wrong!");
            }
            else{
                setError(err.message);
            }
        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {

        const isViewed = localStorage.getItem(`viewed:${username}`) || 'false';

        const url = `${import.meta.env.VITE_API_URL}links/${encodeURIComponent(username)}/${isViewed}`;

        fetchLinks(url);
    }, [username]);

    if(error){
        return (
            <section className={`share section container share__error ${isDarkTheme? 'dark-theme' : ''}`}>
                <h2 className='share__username'>{error}</h2>
            </section>
        )
    }

    return (
        <section className={`share section container ${isDarkTheme? 'dark-theme' : ''}`}>
            <div className='share__avatar'>{ownerDetails?.name[0]?.toUpperCase()}</div>
            <h2 className='share__username'>{ownerDetails.name}</h2>
            {
                ownerDetails.profession && <h3 className='share__userprofession'>{ownerDetails.profession}</h3>
            }
            {
                ownerDetails.bio && <p className='share__userbio'>{ownerDetails.bio}</p>
            }
            <div className='share__container'>
                {
                    links.map((link) => (
                        <Card key={link._id} linkDetails={link}/>
                    ))
                }
            </div>
        </section>
    )
}

export default Share;