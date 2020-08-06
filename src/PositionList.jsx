import React from 'react';
import PropTypes from 'prop-types';
import './PositionList.scss';
import Position from './Position';

function PositionList({ positions, company }) {
    const backgroundColor = getBackgroundColor(company);
    const textColor = getTextColor(company);
    const positionElements = [];
    positions.forEach((position) =>
        positionElements.push(
            <li className={`list-group-item ${backgroundColor} ${textColor}`} key={`${position.title}-position-list-item`}>
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

function getBackgroundColor(company) {
    switch (company) {
        case 'Liberty Mutual Insurance':
            return 'bg-liberty-blue-1';
        case 'UNH InterOperability Lab':
            return 'bg-unh-blue-1';
        case 'BEAM Interactive':
            return 'bg-beam-accent';
        default:
            throw new Error(`Invalid background color for company: ${company}`);
    }
}

function getTextColor(company) {
    switch (company) {
        case 'Liberty Mutual Insurance':
            return 'text-white';
        case 'UNH InterOperability Lab':
            return 'text-white';
        case 'BEAM Interactive':
            return 'text-white';
        default:
            throw new Error(`Invalid background color for company: ${company}`);
    }
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
