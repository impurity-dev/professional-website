import React from 'react';
import './Stars.scss';

type StarsProps = { className?: string };

function Stars({ className }: StarsProps) {
    return (
        <div id="star-container" className={className}>
            <div id="stars-1" />
            <div id="stars-2" />
            <div id="stars-3" />
            <div id="stars-4" />
        </div>
    );
}

Stars.defaultProps = {
    className: '',
};

export default Stars;