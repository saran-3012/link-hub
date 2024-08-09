import React, { useEffect, useState } from 'react';
import { useContextAPI } from '../../App';
import './Dashboard.css';
import Button from '../../components/Buttons/Button';
import ProfileBar from '../../components/ProfileBar/ProfileBar';
import Card from '../../components/Card/Card';
import Popup from '../../components/Popup/Popup';
import AddLink from '../../components/AddLink/AddLink';
import EditLink from '../../components/EditLink/EditLink';
import DeleteLink from '../../components/DeleteLink/DeleteLink';
import ShareLink from '../../components/ShareLink/ShareLink';

const Dashboard = () => {

    const { isDarkTheme, loggedUserDetails, toggleSignup, toggleSignin, userLinks, setUserLinks, isAddLinkOpen, toggleAddLinkOpen, editLinkDetails, setEditLinkDetails, deleteLinkDetails, setDeleteLinkDetails, isShareLinkOpen, toggleShareLinkOpen } = useContextAPI();


    const suggestLogIn = () => {
        if (loggedUserDetails?.name !== '') {
            return;
        }
        toggleSignup();
    };

    useEffect(() => {
        suggestLogIn();
    }, []);

    const fetchUserLinks = async (url, jwtToken) => {

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${jwtToken}`
                }
            });
            const resJson = await res.json();
            if (res.status !== 200) {
                throw new Error("Error while fetching data!");
            }
            setUserLinks(resJson.data);
        }
        catch (err) {
            setError(err.message);
            console.log(err.message);
        }
    };

    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}links/`;
        const jwtToken = localStorage.getItem('jwt-token');
        fetchUserLinks(url, jwtToken);
    }, [loggedUserDetails?.id]);

    if (!loggedUserDetails?.name) {
        return (
            <section className={`dashboard-access section container ${isDarkTheme ? 'dark-theme' : ''}`}>
                <h1 className='dashboard-access-header'>You need to Sign up to access this page</h1>
                <div className='dashboard-access-box'>
                    <Button className={'signin-btn'} buttonName={'Sign In'} onClick={toggleSignin} />
                    <p className='dashboard-access-or'>Or</p>
                    <Button className={'signup-btn'} buttonName={'Sign Up'} onClick={toggleSignup} />
                </div>
            </section>
        )
    }

    return (
        <section className={`dashboard section container ${isDarkTheme ? 'dark-theme' : ''}`}>
            <ProfileBar />
            <div className='dashboard__container'>
                <div className='dashboard__header'>

                    <h2 className='dashboard__title'>My Links</h2>
                    <div className='dashboard__headerbuttons'>
                        <Button className={'addlink-btn'} buttonName={'Add'} onClick={toggleAddLinkOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="addlink-icon">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </Button>
                        <Button className={'sharelink-btn'} buttonName={'Share'} onClick={toggleShareLinkOpen} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="sharelink-icon">
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>

                        </Button>
                    </div>
                </div>
                <div className='dashboard__links'>
                    {
                        userLinks?.map((link) => (
                            <Card key={link._id} linkDetails={link} controls />
                        ))
                    }
                </div>
            </div>
            {
                isAddLinkOpen &&
                (
                    <Popup popupToggle={toggleAddLinkOpen} >
                        <AddLink />
                    </Popup>
                )
            }
            {
                editLinkDetails?._id && (
                    <Popup popupToggle={() => setEditLinkDetails({})}>
                        <EditLink />
                    </Popup>
                )
            }
            {
                deleteLinkDetails?._id && (
                    <Popup popupToggle={() => setDeleteLinkDetails({})}>
                        <DeleteLink />
                    </Popup>
                )
            }
            {
                isShareLinkOpen && (
                    <Popup popupToggle={toggleShareLinkOpen}>
                        <ShareLink />
                    </Popup>
                )
            }
        </section>
    )
};

export default Dashboard;