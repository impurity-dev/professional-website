import React from 'react';
import './Skills.scss';
import Skill from './Skill';

function Skills() {
    return (
        <div className="d-flex flex-column">
            <h2 className="mb-5">Technical Skillset</h2>
            <div className="d-flex flex-row">
                <Skill name="Scala" rating="10" />
                <Skill name="TypeScript" rating="10" />
                <Skill name="TypeScript" rating="10" />
                <Skill name="TypeScript" rating="10" />
                <Skill name="TypeScript" rating="10" />
                <Skill name="TypeScript" rating="10" />
                <Skill name="TypeScript" rating="10" />
            </div>
        </div>
    );
}

export default Skills;
