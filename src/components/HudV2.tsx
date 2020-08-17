import React from 'react';
import './HudV2.scss';
import { ReactComponent as HudTopLeft } from '../assets/HudTopLeft.svg';
import { ReactComponent as HudTopRight } from '../assets/HudTopRight.svg';
import { ReactComponent as HudBottomLeft } from '../assets/HudBottomLeft.svg';
import { ReactComponent as HudBottomRight } from '../assets/HudBottomRight.svg';
import HudSphere from './HudSphere';

type HudV2Props = { className?: string };

function HudV2({ className = '' }: HudV2Props): JSX.Element {
    return (
        <div id="hud" className={className}>
            <HudTopLeft id="top-left-hud" className="position-fixed" width={200} />
            <HudTopRight id="top-right-hud" className="position-fixed" width={200} />
            <HudBottomLeft id="bottom-left-hud" className="position-fixed" width={200} />
            <HudBottomRight id="bottom-right-hud" className="position-fixed" width={200} />
            <HudSphere id="sphere-hud" className="position-fixed" size={200} />
        </div>
    );
}

export default HudV2;
