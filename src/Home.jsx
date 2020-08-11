import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as BriefCase } from './assets/BriefCase.svg';
import { ReactComponent as User } from './assets/User.svg';
import { ReactComponent as Flask } from './assets/Flask.svg';
import Stars from './Stars';

function Home() {
    configureGlobalStyles();
    return (
        <>
            <Stars />
            <div className="d-flex flex-row justify-content-center w-100">
                <ul className="home-menu-container">
                    <li>
                        <Link to="/about">
                            <User className="text-primary-6 home-menu-item" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/experiences">
                            <BriefCase className="text-primary-6 home-menu-item" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/skills">
                            <Flask className="text-primary-6 home-menu-item" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <User className="text-primary-6 home-menu-item" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <User className="text-primary-6 home-menu-item" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <User className="text-primary-6 home-menu-item" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <User className="text-primary-6 home-menu-item" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <User className="text-primary-6 home-menu-item" />
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

/**
 * Hides the overflow such that the stars will not misalign page
 */
function configureGlobalStyles() {
    document.getElementsByTagName('HTML')[0].style.overflow = 'hidden';
    document.getElementsByTagName('HTML')[0].className = 'w-100 h-100';
}

export default Home;
