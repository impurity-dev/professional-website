import React from 'react';
import PropTypes from 'prop-types';
import './ExperienceList.scss';
import Experience from './Experience';

function ExperienceList({ experiences }) {
    const experienceElements = [];
    experiences.forEach((experience) =>
        experienceElements.push(
            <Experience
                className={`p-4 my-1 ${getStyle(experience)}`}
                key={`${experience.company}-${experience.title}-experience`}
                experience={experience}
            />,
        ),
    );
    return (
        <div className="d-flex flex-column">
            <h2 className="text-center mb-3">Professional Experience</h2>
            {experienceElements}
        </div>
    );
}

function getStyle(experience) {
    switch (experience.company) {
        case 'Liberty Mutual Insurance':
            return 'bg-liberty-yellow-1 text-liberty-blue-1';
        case 'UNH InterOperability Lab':
            return 'bg-white text-gray-1';
        case 'BEAM Interactive':
            return 'bg-liberty-yellow-100 text-liberty-blue-100';
        default:
            return 'bg-gray-2 text-white';
    }
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
                    startDate: PropTypes.string,
                    endDate: PropTypes.string,
                }),
            ),
        }),
    ),
};

ExperienceList.defaultProps = {
    experiences: [],
};

export default ExperienceList;
