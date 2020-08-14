import React from 'react';
import './RingMenu.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as BriefCase } from '../assets/BriefCase.svg';
import { ReactComponent as User } from '../assets/User.svg';
import { ReactComponent as Flask } from '../assets/Flask.svg';

function RingMenu({ className }) {
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

RingMenu.propTypes = {
    className: PropTypes.string,
};

RingMenu.defaultProps = {
    className: '',
};

export default RingMenu;