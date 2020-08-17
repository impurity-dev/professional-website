import React from 'react';
import './ExperienceList.scss';
import Experience, { ExperienceCargo } from './Experience';

export type ExperienceCargoList = Array<ExperienceCargo>;

type ExperienceListProps = {
    experiences: ExperienceCargoList;
    className?: string;
};

function ExperienceList({ experiences = [], className = '' }: ExperienceListProps): JSX.Element {
    const experienceElements: Array<JSX.Element> = [];
    experiences.forEach((experience) =>
        experienceElements.push(<Experience className="p-4 my-1" key={`${experience.company}-experience`} experience={experience} />),
    );
    return (
        <div className={`d-flex flex-column ${className}`}>
            <h2 className="text-center mb-3">Professional Experience</h2>
            {experienceElements}
        </div>
    );
}

export default ExperienceList;
