import React, { Component } from 'react';
import './Home.scss';
import HudSphere from './HudSphere';
import Stars from './Stars';
import RingMenu from '../v1/RingMenu';

type Props = {};
type State = {};

class Home extends Component<Props, State> {
    render(): JSX.Element {
        return (
            <div id="space-container" className="position-fixed w-100 h-100">
                <RingMenu className="d-flex position-fixed w-100 h-100 justify-content-center align-items-center" />
                <Stars id="stars" className="position-absolute w-100 h-100" />
                <HudSphere id="sphere-hud" className="position-absolute" size={200} />
            </div>
        );
    }
}

export default Home;
