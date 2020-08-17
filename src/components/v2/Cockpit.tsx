import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Color3, Color4, Vector3 } from '@babylonjs/core/Maths/math';
import { Scene } from '@babylonjs/core/scene';
import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';
import React, { useEffect } from 'react';

type CockpitProps = { id: string; className?: string };

function Cockpit({ id, className = '' }: CockpitProps): JSX.Element {
    useEffect(() => {
        createCockpit(id);
    });
    return <canvas id={id} className={className} />;
}

function createCockpit(id: string): Scene {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const engine = new Engine(canvas);

    const scene = new Scene(engine);
    scene.clearColor = new Color4(1, 0, 0, 0);

    const camera = new FreeCamera('Camera', new Vector3(0, 0, -11), scene);
    camera.setTarget(Vector3.Zero());

    const material = new GridMaterial('Grid', scene);
    material.lineColor = new Color3(0, 1, 1);
    material.mainColor = new Color3(0, 0, 0);

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });

    return scene;
}

export default Cockpit;
