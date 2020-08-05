import React from 'react';
import PropTypes from 'prop-types';
import './SidePanel.scss';
import ProfessionalPicture from './assets/ProfessionalPicture.jpg';
import { ReactComponent as Github } from './assets/Github.svg';
import { ReactComponent as LinkedIn } from './assets/LinkedIn.svg';
import { ReactComponent as Codepen } from './assets/Codepen.svg';

function SidePanel({ className }) {
    const containerClassName = `d-flex flex-column align-items-center py-4 px-3 shadow rounded bg-gray-2 ${className}`;
    return (
        <div id="side-panel-container" className={containerClassName}>
            <img src={ProfessionalPicture} alt="Tyler Kokoszka" id="professional-picture" className="img-fluid mb-5" />
            <h3 className="text-center">Tyler Kokoszka</h3>
            <span className="text-muted">Software Engineer</span>
            <div className="d-flex flex-column align-items-center">
                <Github className="text-primary-8" width={24} />
                <Github className="text-primary-8" width={24} />
                <Github className="text-primary-8" width={24} />
                <Github className="text-primary-8" width={24} />
            </div>
            <div className="d-flex flex-row">
                <Github className="text-primary-8 mx-4" width={24} />
                <LinkedIn className="text-primary-8 mx-4" width={24} />
                <Codepen className="text-primary-8 mx-4" width={24} />
                <Github className="text-primary-8 mx-4" width={24} />
            </div>
        </div>
    );
}

SidePanel.propTypes = {
    className: PropTypes.string,
};

SidePanel.defaultProps = {
    className: '',
};

export default SidePanel;
