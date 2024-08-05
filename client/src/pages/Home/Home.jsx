import React from 'react';
import { useContextAPI } from '../../App';
import './Home.css';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';



const Home = () => {

    const { isDarkTheme } = useContextAPI();

    return (
        <main className={`home section container ${isDarkTheme ? 'dark-theme' : ''}`}>
            <Hero />
            {/* <About /> */}
        </main>
    )
};

export default Home;