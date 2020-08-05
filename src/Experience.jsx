import React from 'react';
import PropTypes from 'prop-types';
import './Experience.scss';
import PositionList from './PositionList';

function Experience({ experience }) {
    return (
        <div className="d-flex flex-column">
            <span>{experience.company}</span>
            <span>{experience.location}</span>
            <span>{experience.website}</span>
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
};

Experience.defaultProps = {
    experience: [],
};

export default Experience;
