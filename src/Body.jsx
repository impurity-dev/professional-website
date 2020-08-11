import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutMe from './AboutMe';
import './Body.scss';
import ExperienceData from './data/Experience.json';
import SkillListData from './data/SkillList.json';
import ExperienceList from './ExperienceList';
import Home from './Home';
import SidePanel from './SidePanel';
import SkillList from './SkillList';

const { skills } = SkillListData;
const { experiences } = ExperienceData;

function Body() {
    return (
        <div className="d-flex flex-row p-5">
            <Switch>
                <Route path="/about">
                    <SidePanel className="w-25 mr-2" />
                    <div className="d-flex flex-column p-5 shadow rounded bg-gray-2 w-75 ml-2">
                        <AboutMe />
                    </div>
                </Route>
                <Route path="/skills">
                    <SidePanel className="w-25 mr-2" />
                    <div className="d-flex flex-column p-5 shadow rounded bg-gray-2 w-75 ml-2">
                        <SkillList skills={skills} />
                    </div>
                </Route>
                <Route path="/experiences">
                    <SidePanel className="w-25 mr-2" />
                    <div className="d-flex flex-column p-5 shadow rounded bg-gray-2 w-75 ml-2">
                        <ExperienceList experiences={experiences} />
                    </div>
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default Body;
