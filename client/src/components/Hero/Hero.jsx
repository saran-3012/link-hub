import React from 'react';
import { useContextAPI } from '../../App';
import './Hero.css';
import Button from '../../components/Buttons/Button';

const Hero = () => {

    const {toggleSignup} = useContextAPI();

    return (
        <section className='hero'>
            <div className='hero__container'>
                <h1 className='hero__title'>Link Hub.</h1>
                <h3 className='hero__header'>Share everything. In one simple link.</h3>
                <article className='hero__text'>Link hub is open source platform. One simple link to manage and share all your links in one platform.</article>
                <Button buttonName={"Get Started"} className={'hero-btn'} onClick={toggleSignup}>
                    <svg className='hero-btn-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </Button>
            </div>
            <div className='hero__container'>

            </div>
        </section>
    )
}

export default Hero;