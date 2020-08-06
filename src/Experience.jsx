import React from 'react';
import PropTypes from 'prop-types';
import './Experience.scss';
import PositionList from './PositionList';
import LibertyLogo from './assets/Liberty.png';
import IolLogo from './assets/IOL.jpg';
import BeamLogo from './assets/Beam.png';

function Experience({ experience, className }) {
    const { company, positions, location } = experience;
    const backgroundColor = getBackgroundColor(company);
    const textColor = getTextColor(company);
    const headerColor = getHeaderColor(company);
    const image = getImage(company);
    return (
        <div className={`d-flex flex-column rounded ${className} ${backgroundColor} ${textColor}`}>
            <div className="d-flex flex-row">
                <h4 className={`flex-grow-1 ${headerColor}`}>
                    <u>{company}</u>
                </h4>
                <img className="ml-auto img-fluid experience-image mb-3" src={image} alt={`${company}-brand`} />
            </div>
            <div className="d-flex flex-row">
                <h6 className="flex-grow-1">{location}</h6>
                <span>
                    {positions[0].startDate} - {positions[positions.length - 1].endDate}
                </span>
            </div>
            <PositionList positions={positions} />
        </div>
    );
}

function getImage(company) {
    switch (company) {
        case 'Liberty Mutual Insurance':
            return LibertyLogo;
        case 'UNH InterOperability Lab':
            return IolLogo;
        case 'BEAM Interactive':
            return BeamLogo;
        default:
            throw new Error(`Invalid image for company: ${company}`);
    }
}

function getTextColor(company) {
    switch (company) {
        case 'Liberty Mutual Insurance':
            return 'text-liberty-blue-1';
        case 'UNH InterOperability Lab':
            return 'text-gray-1';
        case 'BEAM Interactive':
            return 'text-beam-gray-3';
        default:
            throw new Error(`Invalid text color for company: ${company}`);
    }
}

function getBackgroundColor(company) {
    switch (company) {
        case 'Liberty Mutual Insurance':
            return 'bg-liberty-yellow-1';
        case 'UNH InterOperability Lab':
            return 'bg-white';
        case 'BEAM Interactive':
            return 'bg-beam-gray-4';
        default:
            throw new Error(`Invalid background color for company: ${company}`);
    }
}

function getHeaderColor(company) {
    switch (company) {
        case 'Liberty Mutual Insurance':
            return 'text-liberty-blue-1';
        case 'UNH InterOperability Lab':
            return 'text-unh-blue-2';
        case 'BEAM Interactive':
            return 'text-beam-accent';
        default:
            throw new Error(`Invalid header color for company: ${company}`);
    }
}

Experience.propTypes = {
    experience: PropTypes.exact({
        company: PropTypes.string,
        location: PropTypes.string,
        website: PropTypes.string,
        positions: PropTypes.arrayOf(
            PropTypes.exact({
                title: PropTypes.string,
                startDate: PropTypes.string,
                endDate: PropTypes.string,
            }),
        ),
    }),
    className: PropTypes.string,
    textColor: PropTypes.string,
    headerColor: PropTypes.string,
    backgroundColor: PropTypes.string,
};

Experience.defaultProps = {
    experience: [],
    className: '',
    textColor: '',
    headerColor: '',
    backgroundColor: '',
};

export default Experience;
