import React, { Component } from 'react';
import './App.scss';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

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
        const appContainerClass = `${theme} bg-gray-1 text-white`;
        return (
            <div className={appContainerClass}>
                <header>
                    <Header onChangeTheme={this.changeTheme} />
                </header>
                <main className="p-5">
                    <Body />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}

export default App;
