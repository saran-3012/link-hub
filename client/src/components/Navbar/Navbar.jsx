import React, { useEffect, useRef, useState } from 'react';
import { useContextAPI } from '../../App';
import './Navbar.css';
import AppLogo from '../../assets/app-logo.png';
import SunIcon from '../../assets/sun-icon.png';
import MoonIcon from '../../assets/moon-icon.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from '../Buttons/Button';



const Navbar = () => {

    const { isDarkTheme, toggleTheme, isSidebarOpen, toggleSidebar, toggleSignin, toggleSignup, loggedUserDetails, setLoggedUserDetails, logout } = useContextAPI();

    const [isDropdownPanelOpen, setIsDropdownPanelOpen] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdownPanel = () => {
        setIsDropdownPanelOpen((prevState) => !prevState);
    };

    const captureMouseClick = (e) => {
        if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
            setIsDropdownPanelOpen(false);
        }
    };

    useEffect(() => {
        if(isDropdownPanelOpen){
            document.addEventListener('click', captureMouseClick);
        }
        else{
            document.removeEventListener('click', captureMouseClick);
        }
    }, [isDropdownPanelOpen]);

    return (
        <header className={`navbar container ${isDarkTheme ? 'dark-theme' : ''}`}>
            <Link className='navbar__logo' to='/'>
                <img src={AppLogo} alt="App Logo" />
            </Link>
            <nav className='navbar__menu'>
                <ul className='navbar__menulist-pc'>
                    <li className='navbar__menuitem-pc'>
                        <NavLink className='navbar__link' to="/">Home</NavLink>
                    </li>
                    <li className='navbar__menuitem-pc'>
                        <NavLink className='navbar__link' to="/dashboard">Dashboard</NavLink>
                    </li>

                    {
                        loggedUserDetails?.name ?
                            (
                                <li className='navbar__menuitem-pc dropdown' ref={dropdownRef}>
                                    <Button className={'user-avatar'} buttonName={loggedUserDetails?.name?.split(' ')[0]} onClick={toggleDropdownPanel}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{ width: '16px', height: '16px' }}>
                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </Button>
                                    {
                                        isDropdownPanelOpen && (
                                            <div className='dropdown-options'>
                                                <Button className={'logout-btn'} buttonName={"Logout"} onClick={logout}/>
                                            </div>
                                        )
                                    }
                                </li>
                            )
                            :
                            (
                                <li className='navbar__menuitem-pc'>
                                    <Button className={'signup-btn'} buttonName={'Sign Up'} onClick={toggleSignup} />
                                </li>
                            )
                    }

                    <li className='navbar__menuitem-pc' >
                        <Button className={'theme-btn'} buttonIcon={isDarkTheme ? SunIcon : MoonIcon} onClick={toggleTheme} />
                    </li>
                </ul>
                <ul className='navbar__menulist-mp'>
                    <li className="navbar__menuitem-mp">
                        <Button className={'theme-btn'} buttonIcon={isDarkTheme ? SunIcon : MoonIcon} onClick={toggleTheme} />
                    </li>
                    <li className="navbar__menuitem-mp">
                        <Button className={'menu-btn'} onClick={toggleSidebar}>
                            {
                                isSidebarOpen ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>)
                                    :
                                    (<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" xmlSpace="preserve">
                                        <g>
                                            <path d="M21 6.75H8a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5zm.75 5.25a.75.75 0 0 0-.75-.75H3a.75.75 0 0 0 0 1.5h18a.75.75 0 0 0 .75-.75zm0 6a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 .75-.75z" fill="currentcolor" opacity="1" />
                                        </g>
                                    </svg>)
                            }
                        </Button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;