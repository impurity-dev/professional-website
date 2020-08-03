import React from 'react';
import PropTypes from 'prop-types';
import './SidePanel.scss';
import ProfessionalPicture from './assets/ProfessionalPicture.jpg';

function SidePanel({ className }) {
    const containerClassName = `d-flex flex-column align-items-center py-4 px-3 shadow rounded bg-gray-2 ${className}`;
    return (
        <div id="side-panel-container" className={containerClassName}>
            <img src={ProfessionalPicture} alt="Tyler Kokoszka" id="professional-picture" className="img-fluid mb-5" />
            <h3>Tyler Kokoszka</h3>
            <span className="text-muted">Software Engineer</span>
            <div className="d-flex flex-column">
                <span>Age</span>
                <span>Age</span>
                <span>Age</span>
                <span>Age</span>
                <span>Age</span>
                <span>Age</span>
            </div>
            <div className="d-flex flex-row">
                <span>Link</span>
                <span>Link</span>
                <span>Link</span>
                <span>Link</span>
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
