import React from 'react';
import PropTypes from 'prop-types';
import './ExperienceList.scss';
import Experience from './Experience';

function ExperienceList({ experiences }) {
    const experienceElements = [];
    experiences.forEach((experience) =>
        experienceElements.push(
            <Experience className="p-4 my-1" key={`${experience.company}-${experience.title}-experience`} experience={experience} />,
        ),
    );
    return (
        <div className="d-flex flex-column">
            <h2 className="text-center mb-3">Professional Experience</h2>
            {experienceElements}
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
