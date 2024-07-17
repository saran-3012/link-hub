import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';



const Navbar = () => {
  return (
    <header className='navbar container'>
        <Link className='navbar__logo' to='/'>

        </Link>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/"></Link>
                </li>
                <li>
                    <Link to="/"></Link>
                </li>
                <li>
                    <Link to="/"></Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar;