import React from 'react';
import './Stars.scss';

function Stars({ className }) {
    return (
        <div className={className}>
            <div id="stars-1" />
            <div id="stars-2" />
            <div id="stars-3" />
            <div id="stars-4" />
        </div>
    );
}

export default Stars;
