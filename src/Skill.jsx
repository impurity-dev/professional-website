import React from 'react';
import PropTypes from 'prop-types';
import './Skill.scss';
import { ReactComponent as FilledStar } from './assets/FilledStar.svg';
import { ReactComponent as EmptyStar } from './assets/EmptyStar.svg';

function Skill({ name, rating, maxRating }) {
    const starElements = [];
    for (let i = 0; i < rating; i++) {
        starElements.push(<FilledStar className="text-primary-8" width={24} key={`${name}-filled-star-${i}`} />);
    }
    const emptyStars = maxRating - rating;
    for (let i = 0; i < emptyStars; i++) {
        starElements.push(<EmptyStar className="text-primary-8" width={24} key={`${name}-empty-star-${i}`} />);
    }
    return (
        <div className="d-flex flex-row">
            <div className="flex-grow-1">{name}</div>
            <div>{starElements}</div>
        </div>
    );
}

Skill.propTypes = {
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    maxRating: PropTypes.number,
};

Skill.defaultProps = {
    maxRating: 10,
};

export default Skill;
