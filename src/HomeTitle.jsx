import React from 'react';
import PropTypes from 'prop-types';
import './HomeTitle.scss';

function HomeTitle({ className }) {
    return (
        <div className={`d-lg-flex d-none flex-column ${className}`}>
            <h1 className="text-white">Tyler Kokoszka</h1>
            <hr />
            <h2 className="text-white">Software Engineer</h2>
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
