import React from 'react';
import './Stars.scss';
import PropTypes from 'prop-types';

function Stars({ className }) {
    return (
        <div id="star-container" className={className}>
            <div id="stars-1" />
            <div id="stars-2" />
            <div id="stars-3" />
            <div id="stars-4" />
        </div>
    );
}

Stars.propTypes = {
    className: PropTypes.string,
};

Stars.defaultProps = {
    className: '',
};

export default Stars;
