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
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownPanelOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownPanelOpen) {
            document.addEventListener('click', captureMouseClick);
        }
        else {
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
                                                <Button className={'logout-btn'} buttonName={"Logout"} onClick={logout} />
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
                    <a className='navbar__iconlink' href="https://github.com/saran-3012/link-hub" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className='navbar__icon'>
                            <path
                                fillRule="evenodd"
                                d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </ul>
                <ul className='navbar__menulist-mp'>
                    <a className='navbar__iconlink' href="https://github.com/saran-3012/link-hub" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className='navbar__icon'>
                            <path
                                fillRule="evenodd"
                                d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
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