import React from 'react';
import './Home.scss';
import Stars from './Stars';
import Hud from './Hud';

type HomeProps = { className?: string };

function Home({ className = '' }: HomeProps): JSX.Element {
    return (
        <div id="space-container" className={`position-fixed w-100 h-100 ${className}`}>
            <Stars id="stars" className="position-absolute w-100 h-100" />
            <Hud className="position-absolute" />
        </div>
    );
}

export default Home;
