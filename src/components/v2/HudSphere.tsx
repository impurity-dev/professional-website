import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import '@babylonjs/core/Loading/loadingScreen';
import { Color3, Color4, Vector3 } from '@babylonjs/core/Maths/math';
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';
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

    const camera = new FreeCamera('Camera', new Vector3(0, 0, -11), scene);
    camera.setTarget(Vector3.Zero());

    const material = new GridMaterial('Grid', scene);
    material.lineColor = new Color3(0, 1, 1);
    material.mainColor = new Color3(0, 0, 0);
    const sphere = Mesh.CreateSphere('Sphere', 20, 8, scene);
    sphere.position.y = 0;
    sphere.material = material;

    scene.onBeforeRenderObservable.add(() => {
        const rotation = (2 * Math.PI) / 60;
        sphere.rotation.y += rotation / 12;
        sphere.rotation.x += rotation / 24;
    });

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });

    return scene;
}

export default HudSphere;
