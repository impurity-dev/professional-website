import React from 'react';
import './Position.scss';

export type PositionCargo = { title: string; startDate: string; endDate: string };

type PositionProps = { position: PositionCargo; className?: string };

function Position({ position, className }: PositionProps): JSX.Element {
    const containerClass = `d-flex flex-row ${className}`;
    return (
        <div className={containerClass}>
            <h6 className="flex-grow-1">{position.title}</h6>
            <span>
                {position.startDate} - {position.endDate}
            </span>
        </div>
    );
}

Position.defaultProps = {
    className: '',
};

export default Position;
