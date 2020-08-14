import React from 'react';
import './HomeTitle.scss';

type HomeTitleProps = { className?: string };

function HomeTitle({ className }: HomeTitleProps) {
    return (
        <div className={`d-lg-flex d-none flex-column align-items-center ${className}`}>
            <h1 id="home-title-name" className="text-white">
                TYLER KOKOSZKA
            </h1>
            <hr id="home-title-hr" />
            <h2 id="home-title-job" className="text-white">
                Software Engineer
            </h2>
        </div>
    );
}

HomeTitle.defaultProps = {
    className: '',
};

export default HomeTitle;
