import React from 'react';
import './Hud.scss';
import PropTypes from 'prop-types';
import { ReactComponent as HudTopLeft } from '../assets/HudTopLeft.svg';
import { ReactComponent as HudTopRight } from '../assets/HudTopRight.svg';
import { ReactComponent as HudBottomLeft } from '../assets/HudBottomLeft.svg';
import { ReactComponent as HudBottomRight } from '../assets/HudBottomRight.svg';
import { ReactComponent as HudMiniMap } from '../assets/HudMiniMap.svg';

function Hud({ className }) {
    return (
        <div id="hud" className={className}>
            <HudTopLeft id="top-left-hud" className="position-fixed" width={200} />
            <HudTopRight id="top-right-hud" className="position-fixed" width={200} />
            <HudBottomLeft id="bottom-left-hud" className="position-fixed" width={200} />
            <HudBottomRight id="bottom-right-hud" className="position-fixed" width={200} />
            <HudMiniMap id="mini-map-hud" className="position-fixed" width={200} />
        </div>
    );
}

Hud.propTypes = {
    className: PropTypes.string,
};

Hud.defaultProps = {
    className: '',
};

export default Hud;
