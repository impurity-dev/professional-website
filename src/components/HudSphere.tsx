import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3, Color4, Color3 } from '@babylonjs/core/Maths/math';
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { GridMaterial } from '@babylonjs/materials/grid';
import React, { useEffect } from 'react';

type HudSphereProps = { id: string; className?: string; size: number };

function HudSphere({ id, className = '', size }: HudSphereProps): JSX.Element {
    useEffect(() => {
        createSphere(id);
    });
    return <canvas id={id} className={className} width={size} height={size} />;
}

function createSphere(id: string): Scene {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const engine = new Engine(canvas);

    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);

    const camera = new FreeCamera('camera1', new Vector3(0, 0, -11), scene);
    camera.setTarget(Vector3.Zero());

    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const material = new GridMaterial('grid', scene);
    material.lineColor = new Color3(0, 1, 1);
    material.mainColor = new Color3(0, 0, 0);
    const sphere = Mesh.CreateSphere('sphere1', 20, 8, scene);
    sphere.position.y = 0;
    sphere.material = material;

    engine.runRenderLoop(() => {
        scene.render();
    });

    let time = 0;
    scene.onBeforeRenderObservable.add(() => {
        time += (2 * Math.PI) / 60 / 2;
        const rotation = (2 * Math.PI) / 60;
        sphere.rotation.y += rotation / 12;
        sphere.rotation.x += rotation / 24;
    });

    return scene;
}

export default HudSphere;
