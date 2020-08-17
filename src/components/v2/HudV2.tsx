import React from 'react';
import './HudV2.scss';
import HudSphere from './HudSphere';
import StarsV2 from './StarsV2';

type HudV2Props = { className?: string };

function HudV2({ className = '' }: HudV2Props): JSX.Element {
    return (
        <div id="space-container" className={`d-flex align-items-center justify-content-center position-fixed w-100 h-100 ${className}`}>
            <StarsV2 id="stars-hud" className="position-absolute w-100 h-100" />
            <HudSphere id="sphere-hud" className="position-absolute" size={200} />
        </div>
    );
}

export default HudV2;
