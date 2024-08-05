import React from 'react';
import { useContextAPI } from '../../App';
import './Dashboard.css';

const Dashboard = () => {

    const { isDarkTheme } = useContextAPI();

    return (
        <section className={`dashboard section container ${isDarkTheme ? 'dark-theme' : ''}`}>
            {/* This should be taken care later */}
        </section>
    )
};

export default Dashboard;