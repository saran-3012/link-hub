import React, { useEffect } from 'react';
import { useContextAPI } from '../../App';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import Button from '../Buttons/Button';

const Sidebar = () => {

    const { isDarkTheme, sidebarRef, toggleSidebar, loggedUserDetails, setLoggedUserDetails } = useContextAPI();

    useEffect(() => {
        const mountTime = Date.now();

        const handleClick = (e) => {

            if (Date.now() - mountTime < 1) {
                return;
            }

            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                toggleSidebar();
            }

        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <aside className={`sidebar ${isDarkTheme ? 'dark-theme' : ''}`} ref={sidebarRef}>
            <nav className='sidebar__menu'>
                <ul className='sidebar__menulist'>
                    <li className='sidebar__menuitem'>
                        <Link className='sidebar__link' to="/">Home</Link>
                    </li>
                    <li className='sidebar__menuitem'>
                        <Link className='sidebar__link' to="/dashboard">Dashboard</Link>
                    </li>
                    {
                        loggedUserDetails?.name ? (
                            <li className='sidebar__menuitem'>
                                <Button className={'user-avatar'} buttonName={loggedUserDetails?.name?.split(' ')[0]} >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{width: '16px', height: '16px'}}>
                                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </li>
                        )
                        :
                        (
                            <>
                                <li className='sidebar__menuitem'>
                                    <Button className={'signin-btn'} buttonName={'Sign In'} />
                                </li>
                                <li className='sidebar__menuitem'>
                                    <Button className={'signup-btn'} buttonName={'Sign Up'} />
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;