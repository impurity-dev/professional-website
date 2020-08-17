import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import '@babylonjs/core/Meshes/meshBuilder';
import { ParticleSystem } from '@babylonjs/core/Particles/particleSystem';
import { Scene } from '@babylonjs/core/scene';
import React, { useEffect } from 'react';
import StarTexture from '../textures/Star.png';
import './StarsV2.scss';

type StarsV2Props = { id: string; className?: string };

function StarsV2({ id, className = '' }: StarsV2Props): JSX.Element {
    useEffect(() => {
        createStars(id);
    });
    return <canvas id={id} className={className} />;
}

function createStars(id: string): Scene {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const engine = new Engine(canvas);

    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);

    const camera = new FreeCamera('Camera', new Vector3(0, 0, -10), scene);
    camera.setTarget(Vector3.Zero());

    const particleSystem = new ParticleSystem('Particles', 2000, scene);
    particleSystem.particleTexture = new Texture(StarTexture, scene);
    particleSystem.minAngularSpeed = -0.5;
    particleSystem.maxAngularSpeed = 0.5;
    particleSystem.minSize = 0.005;
    particleSystem.maxSize = 0.01;
    particleSystem.minLifeTime = 5;
    particleSystem.maxLifeTime = 6;
    particleSystem.createBoxEmitter(new Vector3(1, 1, 1), new Vector3(-1, -1, -1), new Vector3(0, 0, 0), new Vector3(0, 0, 0));
    particleSystem.minEmitPower = 0.5;
    particleSystem.maxEmitPower = 4.0;
    particleSystem.emitRate = 400;
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
    particleSystem.color1 = new Color4(1, 1, 1);
    particleSystem.color2 = new Color4(1, 1, 1);
    particleSystem.start();

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });

    return scene;
}

export default StarsV2;
