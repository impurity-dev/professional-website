import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Body.scss';
import Home from './Home';
import MainPanel from './MainPanel';
import SidePanel from './SidePanel';

function Body() {
    return (
        <div className="d-flex flex-row">
            <Switch>
                <Route path="/about">
                    <SidePanel className="w-25 mr-2" />
                    <MainPanel className="w-75 ml-2" />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default Body;
