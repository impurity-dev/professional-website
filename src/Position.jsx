import React from 'react';
import PropTypes from 'prop-types';
import './Position.scss';

function Position({ position }) {
    return (
        <div className="d-flex flex-column">
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
};

export default Position;
