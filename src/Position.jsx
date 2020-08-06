import React from 'react';
import PropTypes from 'prop-types';
import './Position.scss';

function Position({ position, className }) {
    const containerClass = `d-flex flex-column ${className}`;
    return (
        <div className={containerClass}>
            <span>{position.title}</span>
            <span>{position.startDate}</span>
            <span>{position.endDate}</span>
        </div>
    );
}

Position.propTypes = {
    position: PropTypes.exact({
        title: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
    }).isRequired,
    className: PropTypes.string,
};

Position.defaultProps = {
    className: '',
};

export default Position;
