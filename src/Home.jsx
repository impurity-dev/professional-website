import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as BriefCase } from './assets/BriefCase.svg';
import { ReactComponent as User } from './assets/User.svg';
import { ReactComponent as Flask } from './assets/Flask.svg';
import Stars from './Stars';

function Home() {
    document.getElementsByTagName('HTML')[0].style.overflow = 'hidden';
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

export default Home;
