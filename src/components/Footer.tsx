import React from 'react';
import './Footer.scss';

function Footer(): JSX.Element {
    return (
        <div className="d-flex flex-row px-5">
            <p>
                Icons made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a>,{' '}
                <a href="https://www.flaticon.com/authors/pixel-perfect">Pixel perfect</a> from{' '}
                <a href="https://www.flaticon.com/">www.flaticon.com</a>
            </p>
        </div>
    );
}

export default Footer;
