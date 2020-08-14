import React from 'react';
import PropTypes from 'prop-types';
import './Position.scss';

function Position({ position, className }) {
    const containerClass = `d-flex flex-row ${className}`;
    return (
        <div className={containerClass}>
            <h6 className="flex-grow-1">{position.title}</h6>
            <span>
                {position.startDate} - {position.endDate}
            </span>
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
