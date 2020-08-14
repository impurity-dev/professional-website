import React from 'react';
import './SkillList.scss';
import Skill, { SkillCargo } from './Skill';

export type SkillCargoList = Array<SkillCargo>;

type SkillCargoProps = { skills: SkillCargoList; className?: string };

function SkillList({ skills, className }: SkillCargoProps): JSX.Element {
    const skillElements: Array<JSX.Element> = [];
    skills.forEach((skill) =>
        skillElements.push(
            <li className="list-group-item bg-gray-1" key={`${skill.name}-skill-list-item`}>
                <Skill skill={skill} />
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

SkillList.defaultProps = {
    skills: [],
    className: '',
};

export default SkillList;
