import React from 'react';
import './Header.scss';

function Header(): JSX.Element {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/#">
                        Home <span className="sr-only">(current)</span>
                    </a>
                    <a className="nav-item nav-link" href="/#">
                        Features
                    </a>
                    <a className="nav-item nav-link" href="/#">
                        Pricing
                    </a>
                    <a className="nav-item nav-link disabled" href="/#">
                        Disabled
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Header;
