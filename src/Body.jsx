import React from 'react';
import './Body.scss';
import SidePanel from './SidePanel';
import MainPanel from './MainPanel';

function Body() {
    return (
        <div className="d-flex flex-row">
            <SidePanel className="w-25 mr-2" />
            <MainPanel className="w-75 ml-2" />
        </div>
    );
}

export default Body;
