import React from 'react';
import PropTypes from 'prop-types';
import './Skill.scss';

function Skill({ name, rating }) {
    return (
        <div className="d-flex flex-row">
            <div>{name}</div>
            <div>{rating}/10</div>
        </div>
    );
}

Skill.propTypes = {
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
};

export default Skill;
