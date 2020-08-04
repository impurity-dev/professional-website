import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <div className="d-flex flex-row">
            <ul>
                <li>
                    Icons made by{' '}
                    <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                        Freepik
                    </a>{' '}
                    from{' '}
                    <a href="https://www.flaticon.com/" title="Flaticon">
                        {' '}
                        www.flaticon.com
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Footer;
