import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createCube } from '../webgl/Cube3D';

function Cube3D({ id, className, size }) {
    useEffect(() => createCube(id));
    return <canvas id={id} className={className} />;
}

Cube3D.propTypes = {
    id: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    className: PropTypes.string,
};

Cube3D.defaultProps = {
    className: '',
};

export default Cube3D;
