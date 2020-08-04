import React from 'react';
import './Skills.scss';
import Skill from './Skill';

function Skills() {
    const maxRating = 10;
    return (
        <div className="d-flex flex-column">
            <h2 className="mb-5">Technical Skillset</h2>
            <div className="d-flex flex-row px-2">
                <h4 className="flex-grow-1">Language</h4>
                <h4>Skill Level</h4>
            </div>
            <ul className="list-group list-group-flush rounded">
                <li className="list-group-item bg-gray-1">
                    <Skill name="Java" rating={10} maxRating={maxRating} />
                </li>
                <li className="list-group-item bg-gray-1">
                    <Skill name="Typescript" rating={10} maxRating={maxRating} />
                </li>
                <li className="list-group-item bg-gray-1">
                    <Skill name="Javascript" rating={10} maxRating={maxRating} />
                </li>
                <li className="list-group-item bg-gray-1">
                    <Skill name="Scala" rating={10} maxRating={maxRating} />
                </li>
                <li className="list-group-item bg-gray-1">
                    <Skill name="Kotlin" rating={10} maxRating={maxRating} />
                </li>
                <li className="list-group-item bg-gray-1">
                    <Skill name="OpenGL" rating={2} maxRating={maxRating} />
                </li>
                <li className="list-group-item bg-gray-1">
                    <Skill name="C" rating={6} maxRating={maxRating} />
                </li>
                <li className="list-group-item bg-gray-1">
                    <Skill name="C++" rating={7} maxRating={maxRating} />
                </li>
                <li className="list-group-item bg-gray-1">
                    <Skill name="C#" rating={10} maxRating={maxRating} />
                </li>
                <li className="list-group-item bg-gray-1">
                    <Skill name="WPF" rating={2} maxRating={maxRating} />
                </li>
            </ul>
        </div>
    );
}

export default Skills;
