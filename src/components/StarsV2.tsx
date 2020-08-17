import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Color4, Vector3, Color3 } from '@babylonjs/core/Maths/math';
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import '@babylonjs/core/Meshes/meshBuilder';
import { ParticleSystem } from '@babylonjs/core/Particles/particleSystem';
import { Scene } from '@babylonjs/core/scene';
import React, { useEffect } from 'react';
import './StarsV2.scss';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import StarTexture from '../textures/Star.png';

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

    // Emitters
    const particleEmitter = Mesh.CreateBox('Emitter', 0.1, scene);
    particleEmitter.isVisible = false;

    const particleSystem = new ParticleSystem('Particles', 2000, scene);
    particleSystem.particleTexture = new Texture(StarTexture, scene);
    particleSystem.minAngularSpeed = -0.5;
    particleSystem.maxAngularSpeed = 0.5;
    particleSystem.minSize = 0.005;
    particleSystem.maxSize = 0.01;
    particleSystem.minLifeTime = 5;
    particleSystem.maxLifeTime = 6;
    particleSystem.minEmitPower = 0.5;
    particleSystem.maxEmitPower = 4.0;
    particleSystem.emitter = particleEmitter;
    particleSystem.emitRate = 400;
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
    particleSystem.minEmitBox = new Vector3(0, 0, 0);
    particleSystem.maxEmitBox = new Vector3(0, 0, 0);
    particleSystem.direction1 = new Vector3(-1, -1, -1);
    particleSystem.direction2 = new Vector3(1, 1, 1);
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
