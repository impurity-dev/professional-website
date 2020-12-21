import { ParticleSystem, Scene, Vector3, Texture, Mesh, Color4 } from '@babylonjs/core';

export default class GasCloudParticles {
    constructor(private readonly scene: Scene) {
        const particleSystem: ParticleSystem = new ParticleSystem('GasClouds', 2500, scene);
        const fogTexture = new Texture('https://raw.githubusercontent.com/aWeirdo/Babylon.js/master/smoke_15.png', scene);
        const fountain = Mesh.CreateBox('foutain', 0.01, scene);
        fountain.visibility = 0;

        particleSystem.manualEmitCount = particleSystem.getCapacity();
        particleSystem.minEmitBox = new Vector3(-25, 2, -25); // Starting all from
        particleSystem.maxEmitBox = new Vector3(25, 2, 25); // To...

        particleSystem.particleTexture = fogTexture.clone();
        particleSystem.emitter = fountain;

        particleSystem.color1 = new Color4(0.8, 0.8, 0.8, 0.1);
        particleSystem.color2 = new Color4(0.95, 0.95, 0.95, 0.15);
        particleSystem.colorDead = new Color4(0.9, 0.9, 0.9, 0.1);
        particleSystem.minSize = 3.5;
        particleSystem.maxSize = 5.0;
        particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER;
        particleSystem.emitRate = 50000;
        particleSystem.blendMode = ParticleSystem.BLENDMODE_STANDARD;
        particleSystem.gravity = new Vector3(0, 0, 0);
        particleSystem.direction1 = new Vector3(0, 0, 0);
        particleSystem.direction2 = new Vector3(0, 0, 0);
        particleSystem.minAngularSpeed = -2;
        particleSystem.maxAngularSpeed = 2;
        particleSystem.minEmitPower = 0.5;
        particleSystem.maxEmitPower = 1;
        particleSystem.updateSpeed = 0.005;

        particleSystem.start();
    }
}
