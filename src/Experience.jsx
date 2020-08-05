import React from 'react';
import PropTypes from 'prop-types';
import './Experience.scss';

function Experience({ experience }) {
    return (
        <div className="d-flex flex-row">
            <span>{JSON.stringify(experience)}</span>
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
                'start-date': PropTypes.string,
                'end-date': PropTypes.string,
            }),
        ),
    }),
};

Experience.defaultProps = {
    experience: [],
};

export default Experience;
