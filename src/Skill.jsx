import React from 'react';
import PropTypes from 'prop-types';
import './Skill.scss';
import { ReactComponent as FilledStar } from './assets/FilledStar.svg';
import { ReactComponent as EmptyStar } from './assets/EmptyStar.svg';

function Skill({ name, rating, maxRating }) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<FilledStar className="text-primary-8" width={24} key={i} />);
    }
    const emptyStars = maxRating - rating;
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<EmptyStar className="text-primary-8" width={24} key={i} />);
    }
    return (
        <div className="d-flex flex-row">
            <div className="flex-grow-1">{name}</div>
            <div>{stars}</div>
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
