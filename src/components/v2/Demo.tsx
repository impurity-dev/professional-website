import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { HolographicButton } from '@babylonjs/gui/3D/controls/holographicButton';
import { GUI3DManager } from '@babylonjs/gui/3D/gui3DManager';
import React, { useEffect } from 'react';
import './Stars.scss';

type Props = { id: string; className?: string };

function Demo({ id, className = '' }: Props): JSX.Element {
    useEffect(() => {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        const engine = new Engine(canvas);
        const scene = new Scene(engine);
        scene.clearColor = new Color4(1, 0, 0, 0);
        // Create the 3D UI manager
        const manager = new GUI3DManager(scene);

        const camera = new FreeCamera('Camera', new Vector3(0, 0, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        const donut = Mesh.CreateTorusKnot('donut', 2, 0.5, 48, 32, 3, 2, scene);
        donut.position = new Vector3(0, 0, 0);
        const anchor = new AbstractMesh('anchor', scene);

        // Let's add a button
        const button = new HolographicButton('down');
        manager.addControl(button);
        button.linkToTransformNode(anchor);
        button.position.z = -1.5;

        button.text = 'rotate';
        button.imageUrl = './textures/down.png';
        button.onPointerUpObservable.add(function () {
            donut.rotation.x -= 0.05;
        });

        engine.runRenderLoop(() => scene.render());
        window.addEventListener('resize', () => engine.resize());
    });

    return <canvas id={id} className={className} />;
}

export default Demo;
