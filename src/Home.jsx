import React, { useEffect } from 'react';
import './Home.scss';
import Stars from './Stars';
import RingMenu from './RingMenu';

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
            <Stars />
            <RingMenu className="d-flex flex-row justify-content-center w-100" />
            <div className="d-flex flex-column justify-content-center position-fixed">
                <h1 className="text-white">Tyler Kokoszka</h1>
                <hr />
                <h2 className="text-white">Software Engineer</h2>
            </div>
        </>
    );
}

export default Home;
