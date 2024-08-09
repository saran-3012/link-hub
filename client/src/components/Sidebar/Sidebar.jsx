import React, { useEffect } from 'react';
import { useContextAPI } from '../../App';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import Button from '../Buttons/Button';

const Sidebar = () => {

    const { isDarkTheme, sidebarRef, toggleSidebar, toggleSignup, toggleSignin, loggedUserDetails, setLoggedUserDetails, logout } = useContextAPI();

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
                            <>
                                <li className='sidebar__menuitem'>
                                    <Button className={'user-avatar'} buttonName={loggedUserDetails?.name?.split(' ')[0]} />
                                </li>
                                <li className='sidebar__menuitem'>
                                    <Button className={'logout-btn'} buttonName={"Logout"} onClick={logout}/>
                                </li>
                            </>
                        )
                        :
                        (
                            <>
                                <li className='sidebar__menuitem'>
                                    <Button className={'signin-btn'} buttonName={'Sign In'} onClick={toggleSignin}/>
                                </li>
                                <li className='sidebar__menuitem'>
                                    <Button className={'signup-btn'} buttonName={'Sign Up'} onClick={toggleSignup}/>
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