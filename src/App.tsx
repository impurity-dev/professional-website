import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AboutMe from './components/v1/AboutMe';
import './App.scss';
import ExperienceListData from './data/ExperienceList.json';
import SkillListData from './data/SkillList.json';
import ExperienceList, { ExperienceCargoList } from './components/v1/ExperienceList';
import Footer from './components/v1/Footer';
import Header from './components/v1/Header';
import Home from './components/v1/Home';
import HudV2 from './components/v2/HudV2';
import SidePanel from './components/v1/SidePanel';
import SkillList, { SkillCargoList } from './components/v1/SkillList';

type AppState = {
    skills: SkillCargoList;
    experiences: ExperienceCargoList;
};
type AppProps = {};

class App extends Component<AppProps, AppState> {
    constructor(props: string) {
        super(props);
        this.state = {
            skills: SkillListData.skills,
            experiences: ExperienceListData.experiences,
        };
    }

    render(): JSX.Element {
        const { skills, experiences } = this.state;
        return (
            <Router>
                <Switch>
                    <Route path="/test">
                        <header />
                        <main className="d-flex flex-row justify-content-center align-items-center w-100 h-100 position-absolute">
                            <HudV2 />
                        </main>
                        <footer />
                    </Route>
                    <Route path="/about">
                        <div className="bg-gray-1 text-white">
                            <header>
                                <Header />
                            </header>
                            <main className="d-flex flex-row p-5">
                                <SidePanel className="w-25 mr-2" />
                                <AboutMe className="d-flex flex-column p-5 shadow rounded bg-gray-2 w-75 ml-2" />
                            </main>
                            <footer>
                                <Footer />
                            </footer>
                        </div>
                    </Route>
                    <Route path="/skills">
                        <div className="bg-gray-1 text-white">
                            <header>
                                <Header />
                            </header>
                            <main className="d-flex flex-row p-5">
                                <SidePanel className="w-25 mr-2" />
                                <SkillList className="d-flex flex-column p-5 shadow rounded bg-gray-2 w-75 ml-2" skills={skills} />
                            </main>
                            <footer>
                                <Footer />
                            </footer>
                        </div>
                    </Route>
                    <Route path="/experiences">
                        <div className="bg-gray-1 text-white">
                            <header>
                                <Header />
                            </header>
                            <main className="d-flex flex-row p-5">
                                <SidePanel className="w-25 mr-2" />
                                <ExperienceList
                                    className="d-flex flex-column p-5 shadow rounded bg-gray-2 w-75 ml-2"
                                    experiences={experiences}
                                />
                            </main>
                            <footer>
                                <Footer />
                            </footer>
                        </div>
                    </Route>
                    <Route path="/">
                        <header />
                        <main className="d-flex flex-row justify-content-center align-items-center w-100 h-100 position-absolute">
                            <Home />
                        </main>
                        <footer />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
