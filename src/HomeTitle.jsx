import React from 'react';
import PropTypes from 'prop-types';
import './HomeTitle.scss';

function HomeTitle({ className }) {
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

HomeTitle.propTypes = {
    className: PropTypes.string,
};

HomeTitle.defaultProps = {
    className: '',
};

export default HomeTitle;
