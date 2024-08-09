import React from 'react';
import {useContextAPI} from '../../App';
import './ProfileBar.css';
import UserProfile from '../UserProfile/UserProfile';
import Blob from '../Blob/Blob';

const ProfileBar = () => {
  const {loggedUserDetails} = useContextAPI();
  return (
    <aside className='profilebar'>
        <UserProfile />
        <div className='blob-container'>
            <Blob className={'profilebar-blob'}/>
            <span className='views-count'>{loggedUserDetails.views} Views</span>
        </div>
    </aside>
  )
}

export default ProfileBar;