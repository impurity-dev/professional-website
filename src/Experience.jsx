import React from 'react';
import PropTypes from 'prop-types';
import './Experience.scss';
import PositionList from './PositionList';

function Experience({ experience, className }) {
    const containerClass = `d-flex flex-column rounded ${className}`;
    return (
        <div className={containerClass}>
            <div className="d-flex flex-row">
                <h4 className="flex-grow-1">
                    <u>{experience.company}</u>
                </h4>
                <h5>{experience.location}</h5>
            </div>
            <div className="d-flex flex-row">
                <h6 className="flex-grow-1">{experience.website}</h6>
                <span>
                    {experience.startDate} - {experience.endDate}
                </span>
            </div>
            <PositionList positions={experience.positions} />
        </div>
    );
}

Experience.propTypes = {
    experience: PropTypes.exact({
        company: PropTypes.string,
        location: PropTypes.string,
        website: PropTypes.string,
        positions: PropTypes.arrayOf(
            PropTypes.exact({
                title: PropTypes.string,
                startDate: PropTypes.string,
                endDate: PropTypes.string,
            }),
        ),
    }),
    className: PropTypes.string,
};

Experience.defaultProps = {
    experience: [],
    className: '',
};

export default Experience;
