import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import Stars from './Stars';

class App extends Component {
    constructor() {
        super();
        this.state = {
            theme: 'dark',
        };
        this.changeTheme = this.changeTheme.bind(this);
    }

    changeTheme(theme) {
        this.setState({ theme });
    }

    render() {
        const { theme } = this.state;
        return (
            <Router>
                <div className={`${theme} bg-gray-1 text-white`}>
                    <header>
                        <Header onChangeTheme={this.changeTheme} />
                    </header>
                    <main>
                        <Stars />
                        <Body />
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </div>
            </Router>
        );
    }
}

export default App;
