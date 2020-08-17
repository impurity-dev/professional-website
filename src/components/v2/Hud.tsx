import React from 'react';
import './Hud.scss';
import HudSphere from './HudSphere';
import Cockpit from './Cockpit';

type HudProps = { className?: string };

function Hud({ className = '' }: HudProps): JSX.Element {
    return (
        <div className={`w-100 h-100 ${className}`}>
            <Cockpit id="cockpit" className="position-absolute w-100 h-100" />
            <HudSphere id="sphere-hud" className="position-absolute" size={200} />
        </div>
    );
}

export default Hud;
