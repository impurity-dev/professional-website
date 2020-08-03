import React from 'react';
import PropTypes from 'prop-types';
import './MainPanel.scss';
import AboutMe from './AboutMe';
import Skills from './Skills';

function MainPanel({ className }) {
    const containerClassName = `d-flex flex-column align-items-center p-5 shadow rounded bg-gray-2 ${className}`;
    return (
        <div className={containerClassName}>
            <div className="mb-2 w-100">
                <AboutMe />
            </div>
            <hr />
            <div className="mb-2 w-100">
                <Skills />
            </div>
        </div>
    );
}

MainPanel.propTypes = {
    className: PropTypes.string,
};

MainPanel.defaultProps = {
    className: '',
};

export default MainPanel;
