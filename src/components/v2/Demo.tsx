import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { HolographicButton } from '@babylonjs/gui/3D/controls/holographicButton';
import { GUI3DManager } from '@babylonjs/gui/3D/gui3DManager';
import React, { useEffect, useRef } from 'react';
import './Stars.scss';
import createHologramMaterial from './HologramMaterial';

type Props = { id: string; className?: string };

function Demo({ id, className = '' }: Props): JSX.Element {
    const reactCanvas = useRef(null);

    useEffect(() => {
        const engine = new Engine(reactCanvas.current);
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        const canvas = scene.getEngine().getRenderingCanvas() as HTMLCanvasElement;
        // scene.debugLayer.show();
        // scene.autoClear = true;
        // Create the 3D UI manager
        const manager = new GUI3DManager(scene);

        const camera = new FreeCamera('Camera', new Vector3(0, 0, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        const donut = Mesh.CreateTorusKnot('donut', 2, 0.5, 48, 32, 3, 2, scene);
        donut.position = new Vector3(0, 0, 0);
        donut.material = createHologramMaterial(scene);

        // Let's add a button
        const button = new HolographicButton('down');
        manager.addControl(button);
        button.position.z = -1.5;

        button.text = 'rotate';
        button.onPointerClickObservable.add(() => {
            donut.rotation.x -= 0.05;
        });

        engine.runRenderLoop(() => scene.render());
        window.addEventListener('resize', () => engine.resize());
    });

    return <canvas ref={reactCanvas} className={className} />;
}

export default Demo;
