import React from 'react';
import PropTypes from 'prop-types';
import './MainPanel.scss';
import AboutMe from './AboutMe';
import SkillList from './SkillList';
import SkillListData from './data/SkillList.json';

function MainPanel({ className }) {
    const containerClassName = `d-flex flex-column align-items-center p-5 shadow rounded bg-gray-2 ${className}`;
    const { skills } = SkillListData;
    return (
        <div className={containerClassName}>
            <div className="mb-2 w-100">
                <AboutMe />
            </div>
            <hr />
            <div className="mb-2 w-100">
                <SkillList skills={skills} />
            </div>
        </div>
    );
}

MainPanel.propTypes = {
    className: PropTypes.string,
};

MainPanel.defaultProps = {
    className: '',
};

export default MainPanel;
