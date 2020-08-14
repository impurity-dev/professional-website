import React, { useEffect } from 'react';
import './Home.scss';
import Stars from './Stars';
import RingMenu from './RingMenu';
import { ReactComponent as HomeSpinner } from '../assets/HomeSpinner.svg';
import Hud from './Hud';
import HomeTitle from './HomeTitle';

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
            <Stars className="position-fixed w-100 h-100" />
            <Hud className="d-lg-block d-none position-fixed w-100 h-100" />
            <HomeSpinner className="d-lg-flex d-none position-fixed w-100 h-100 text-primary-1" />
            <HomeTitle className="position-fixed" />
            <RingMenu className="d-lg-flex d-none justify-content-center" />
        </>
    );
}

export default Home;