import React from 'react';
import './SidePanel.scss';
import ProfessionalPicture from '../assets/ProfessionalPicture.jpg';
import { ReactComponent as Github } from '../assets/Github.svg';
import { ReactComponent as LinkedIn } from '../assets/LinkedIn.svg';
import { ReactComponent as StackOverflow } from '../assets/StackOverflow.svg';
import { ReactComponent as Codepen } from '../assets/Codepen.svg';

type SidePanelProps = { className?: string };

function SidePanel({ className }: SidePanelProps) {
    return (
        <div className={`d-flex flex-column ${className}`}>
            <div id="side-panel-container" className="d-flex flex-column align-items-center py-4 px-3 shadow rounded-top bg-gray-2">
                <img src={ProfessionalPicture} alt="Tyler Kokoszka" id="professional-picture" className="img-fluid mb-5" />
                <h3 className="text-center">Tyler Kokoszka</h3>
                <span className="text-muted">Software Engineer</span>
                <hr />
                <div className="d-flex flex-column align-items-center">
                    <span>Age - 24</span>
                    <span>Location - Boston MA</span>
                </div>
                <hr />
                <div className="d-flex flex-row">
                    <Github className="text-primary-8 mx-4" width={24} />
                    <LinkedIn className="text-primary-8 mx-4" width={24} />
                    <StackOverflow className="text-primary-8 mx-4" width={24} />
                    <Codepen className="text-primary-8 mx-4" width={24} />
                </div>
            </div>
            <div className="d-flex flex-column align-items-center py-4 px-3 shadow rounded-bottom bg-gray-3">
                <button type="button" className="btn bg-primary-5 text-white">
                    Contact Me
                </button>
            </div>
        </div>
    );
}

SidePanel.defaultProps = {
    className: '',
};

export default SidePanel;
