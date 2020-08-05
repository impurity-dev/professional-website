import React from 'react';
import PropTypes from 'prop-types';
import './PositionList.scss';
import Position from './Position';

function PositionList({ positions }) {
    const positionElements = [];
    positions.forEach((position) =>
        positionElements.push(
            <li className="list-group-item bg-gray-2" key={`${position.title}-position-list-item`}>
                <Position position={position} />
            </li>,
        ),
    );
    return (
        <div className="d-flex flex-column">
            <h2 className="mb-3">Positions</h2>
            <ul className="list-group list-group-flush rounded">{positionElements}</ul>
        </div>
    );
}

PositionList.propTypes = {
    positions: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            'start-date': PropTypes.string,
            'end-date': PropTypes.string,
        }),
    ),
};

PositionList.defaultProps = {
    positions: [],
};

export default PositionList;
