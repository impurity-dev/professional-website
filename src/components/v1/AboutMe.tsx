import React from 'react';
import './AboutMe.scss';

type AboutMeProps = { className?: string };

function AboutMe({ className = '' }: AboutMeProps): JSX.Element {
    return (
        <div className={`d-flex flex-column ${className}`}>
            <h1 className="mb-5">About Me</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    );
}

export default AboutMe;
