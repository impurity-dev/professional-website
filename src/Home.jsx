import React, { useEffect } from 'react';
import './Home.scss';
import Stars from './Stars';
import RingMenu from './RingMenu';
import { ReactComponent as HomeSpinner } from './assets/HomeSpinner.svg';
import Hud from './Hud';

function Home() {
    useEffect(() => {
        const htmlElement = document.getElementsByTagName('HTML')[0];
        htmlElement.classList.add('custom-html');
        return function cleanup() {
            htmlElement.classList.remove('custom-html');
        };
    });

    return (
        <>
            <Hud />
            <div className="d-lg-flex d-none position-fixed w-100 h-100">
                <HomeSpinner className="w-100 h-100 text-primary-1" />
            </div>
            <Stars />
            <RingMenu className="d-lg-flex d-none flex-row justify-content-center w-100" />
            <div className="d-lg-flex d-none  flex-column position-fixed">
                <h1 className="text-white">Tyler Kokoszka</h1>
                <hr />
                <h2 className="text-white">Software Engineer</h2>
            </div>
        </>
    );
}

export default Home;
