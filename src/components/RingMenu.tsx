import React from 'react';
import './RingMenu.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as BriefCase } from '../assets/BriefCase.svg';
import { ReactComponent as User } from '../assets/User.svg';
import { ReactComponent as Flask } from '../assets/Flask.svg';

type RingMenuProps = { className?: string };

function RingMenu({ className = '' }: RingMenuProps): JSX.Element {
    return (
        <div className={className}>
            <ul id="home-menu-container">
                <li>
                    <Link to="/about">
                        <User className="home-menu-item" />
                    </Link>
                </li>
                <li>
                    <Link to="/experiences">
                        <BriefCase className="home-menu-item" />
                    </Link>
                </li>
                <li>
                    <Link to="/skills">
                        <Flask className="home-menu-item" />
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        <User className="home-menu-item" />
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        <User className="home-menu-item" />
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        <User className="home-menu-item" />
                    </Link>
                </li>
                <li className="home-menu-item-container">
                    <Link to="/about">
                        <User className="home-menu-item" />
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        <User className="home-menu-item" />
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default RingMenu;
