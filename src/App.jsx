import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutMe from './components/AboutMe';
import './App.scss';
import ExperienceListData from './data/ExperienceList.json';
import SkillListData from './data/SkillList.json';
import ExperienceList from './components/ExperienceList';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import SidePanel from './components/SidePanel';
import SkillList from './components/SkillList';
import Cube3D from './components/Cube3D';

class App extends Component {
    constructor() {
        super();
        this.state = {
            theme: 'dark',
            skills: SkillListData.skills,
            experiences: ExperienceListData.experiences,
        };
        this.changeTheme = this.changeTheme.bind(this);
    }

    changeTheme(theme) {
        this.setState({ theme });
    }

    render() {
        const { theme, skills, experiences } = this.state;
        return (
            <Router>
                <Switch>
                    <Route path="/test">
                        <div className="w-100 h-100 position-fixed d-flex flex-column align-items-center justify-content-center bg-gray-1 text-white">
                            <h1>Test Page</h1>
                            <hr className="w-25 mb-5" />
                            <Cube3D id="cube" size={5} />
                        </div>
                    </Route>
                    <Route path="/about">
                        <div className={`${theme} bg-gray-1 text-white`}>
                            <header>
                                <Header onChangeTheme={this.changeTheme} />
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
                        <div className={`${theme} bg-gray-1 text-white`}>
                            <header>
                                <Header onChangeTheme={this.changeTheme} />
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
                        <div className={`${theme} bg-gray-1 text-white`}>
                            <header>
                                <Header onChangeTheme={this.changeTheme} />
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
