import { ParticleSystem, Scene, Vector3, Texture, Mesh, Color4, MeshBuilder } from '@babylonjs/core';

export default class EngineParticles extends ParticleSystem {
    public readonly fountain: Mesh;

    constructor(readonly scene: Scene) {
        super('EngineParticles', 2000, scene);
        this.particleTexture = new Texture('textures/square.png', scene);
        this.fountain = MeshBuilder.CreateBox('EngineFountain', { size: 50 });
        this.fountain.isVisible = false;
        this.emitter = this.fountain;
        this.emitRate = 1000;
        this.minSize = 0.5;
        this.maxSize = 1;
        this.minLifeTime = 0.2;
        this.maxLifeTime = 0.5;
        this.minEmitPower = 1000;
        this.maxEmitPower = 3000;
        this.addColorGradient(0, new Color4(0, 1, 1, 1));
        this.addColorGradient(1, new Color4(1, 0, 1, 0));
        this.preWarmStepOffset = 10;
        this.preWarmCycles = 100;
        this.direction1 = new Vector3(0, 0, -1);
        this.direction2 = new Vector3(0, 0, -1);
        this.minEmitBox = new Vector3(-25, -25, -25);
        this.maxEmitBox = new Vector3(25, 25, 25);
        this.blendMode = ParticleSystem.BLENDMODE_ONEONE;
        this.isLocal = true;
    }
}
