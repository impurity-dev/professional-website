import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <div className="d-flex flex-row">
            Icons made by{' '}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                Freepik
            </a>
            {', '}
            <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">
                Pixel perfect
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
                {' '}
                www.flaticon.com
            </a>
        </div>
    );
}

export default Footer;
