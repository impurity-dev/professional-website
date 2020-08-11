import React from 'react';
import './SkillList.scss';
import PropTypes from 'prop-types';
import Skill from './Skill';

function SkillList({ skills, className }) {
    const skillElements = [];
    skills.forEach((skill) =>
        skillElements.push(
            <li className="list-group-item bg-gray-1" key={`${skill.name}-skill-list-item`}>
                <Skill name={skill.name} rating={skill.rating} maxRating={skill.maxRating} />
            </li>,
        ),
    );

    return (
        <div className={`d-flex flex-column ${className}`}>
            <h2 className="text-center mb-3">Technical Skillset</h2>
            <div className="d-flex flex-row px-2">
                <h4 className="flex-grow-1">Tool</h4>
                <h4>Proficiency</h4>
            </div>
            <ul className="list-group list-group-flush rounded">{skillElements}</ul>
        </div>
    );
}

SkillList.propTypes = {
    skills: PropTypes.arrayOf(
        PropTypes.exact({
            name: PropTypes.string,
            rating: PropTypes.number,
            maxRating: PropTypes.number,
        }),
    ),
};

SkillList.defaultProps = {
    skills: [],
};

export default SkillList;
