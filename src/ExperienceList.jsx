import React from 'react';
import PropTypes from 'prop-types';
import './ExperienceList.scss';
import Experience from './Experience';

function ExperienceList({ experiences }) {
    const experienceElements = [];
    experiences.forEach((experience) =>
        experienceElements.push(
            <li className="list-group-item bg-gray-1" key={`${experience.company}-${experience.title}-experience-list-item`}>
                <Experience experience={experience} />
            </li>,
        ),
    );
    return (
        <div className="d-flex flex-column">
            <h2 className="text-center mb-3">Professional Experience</h2>
            <ul className="list-group list-group-flush rounded">{experienceElements}</ul>
        </div>
    );
}

ExperienceList.propTypes = {
    experiences: PropTypes.arrayOf(
        PropTypes.exact({
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
    ),
};

ExperienceList.defaultProps = {
    experiences: [],
};

export default ExperienceList;
