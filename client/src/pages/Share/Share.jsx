import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContextAPI } from '../../App';
import './Share.css';
import Card from '../../components/Card/Card';

const Share = () => {

    const {isDarkTheme} = useContextAPI();

    const {username} = useParams();

    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ownerName, setOwnerName] = useState('');

    const fetchLinks = async (url) => {
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const resJson = await res.json();
            if(res.status !== 200){
                throw new Error("Error while fetching data!");
            }
            setLinks(resJson.data);
            setOwnerName(resJson.name);
            console.log(resJson.data)
        }
        catch(err){
            setError(err.message);
            console.log(err.message);
        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}links/${username}`;
        fetchLinks(url);
    }, [username]);

    return (
        <section className={`share container ${isDarkTheme? 'dark-theme' : ''}`}>
            <h2 className='share__header'>{ownerName}</h2>
            <div className='share__container'>
                {
                    links.map((link) => (
                        <Card linkname={link.linkname} linkurl={link.linkurl} linkid={link._id} controls={false}/>
                    ))
                }
            </div>
        </section>
    )
}

export default Share;