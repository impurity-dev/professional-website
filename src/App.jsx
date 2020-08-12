import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutMe from './AboutMe';
import './App.scss';
import ExperienceListData from './data/ExperienceList.json';
import SkillListData from './data/SkillList.json';
import ExperienceList from './ExperienceList';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import SidePanel from './SidePanel';
import SkillList from './SkillList';

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
