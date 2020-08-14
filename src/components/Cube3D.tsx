import React, { useEffect } from 'react';
import { createCube } from '../webgl/Cube3D';

type Cube3DProps = { id: string; className: string; size: number };

function Cube3D({ id, className, size }: Cube3DProps): JSX.Element {
    console.log(size);
    useEffect(() => createCube(id));
    return <canvas id={id} className={className} />;
}

Cube3D.defaultProps = {
    className: '',
};

export default Cube3D;
