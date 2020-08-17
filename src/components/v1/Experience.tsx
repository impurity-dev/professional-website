import React from 'react';
import './Experience.scss';
import PositionList, { PositionsCargoList } from './PositionList';
import LibertyLogo from '../../assets/Liberty.png';
import IolLogo from '../../assets/IOL.jpg';
import BeamLogo from '../../assets/Beam.png';

export type ExperienceCargo = {
    company: string;
    location: string;
    website: string;
    positions: PositionsCargoList;
};
type ExperienceProps = { experience: ExperienceCargo; className?: string };

function Experience({ experience, className = '' }: ExperienceProps): JSX.Element {
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
            <PositionList company={company} positions={positions} />
        </div>
    );
}

function getImage(company: string): string {
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

function getTextColor(company: string): string {
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

function getBackgroundColor(company: string): string {
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

function getHeaderColor(company: string): string {
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

export default Experience;
