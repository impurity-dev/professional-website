import React from 'react';
import './Home.scss';
import Stars from './Stars';
import Cockpit from './Cockpit';
import HudSphere from './HudSphere';

type HomeProps = { className?: string };

function Home({ className = '' }: HomeProps): JSX.Element {
    return (
        <div id="space-container" className={`position-fixed w-100 h-100 ${className}`}>
            <Stars id="stars" className="position-absolute w-100 h-100" />
            <Cockpit id="cockpit" className="position-absolute w-100 h-100" />
            <HudSphere id="sphere-hud" className="position-absolute" size={200} />
        </div>
    );
}

export default Home;
