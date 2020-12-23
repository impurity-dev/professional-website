import { ParticleSystem, Scene, Mesh, Texture, Color4, Vector3 } from '@babylonjs/core';
export default class EngineWarpParticles extends ParticleSystem {
    public readonly fountain: Mesh;

    constructor(private readonly scene: Scene) {
        super('EngineWarpParticles', 3600, scene);
        const energyTexture = new Texture('http://i166.photobucket.com/albums/u83/j1m68/star.jpg', scene);
        this.fountain = Mesh.CreateBox('EngineWarpFountain', 0.01, scene);
        this.fountain.isVisible = false;
        this.particleTexture = energyTexture;
        this.minSize = 1;
        this.maxSize = 2;
        this.minLifeTime = 0.5;
        this.maxLifeTime = 3;
        this.minEmitPower = 3;
        this.maxEmitPower = 3;
        this.minAngularSpeed = -Math.PI;
        this.maxAngularSpeed = Math.PI;
        this.emitter = this.fountain;
        this.emitRate = 1000;
        this.updateSpeed = 0.02;
        this.blendMode = ParticleSystem.BLENDMODE_ONEONE;
        this.color1 = new Color4(0, 0.5, 0.5, 1);
        this.color2 = new Color4(1, 0, 1, 1);
        this.colorDead = new Color4(1, 1, 1, 0.1);

        this.startPositionFunction = function (worldMatrix, positionToUpdate) {
            const rndAngle = Math.random() * Math.PI;
            const randX = this.emitter.position.x * Math.sin(rndAngle);
            const randY = this.emitter.position.y * Math.tan(rndAngle);
            const randZ = this.emitter.position.z * Math.sin(rndAngle);

            Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
        };

        this.updateFunction = function (particles) {
            for (let index = 0; index < particles.length; index++) {
                const particle = particles[index];
                particle.age += this._scaledUpdateSpeed;
                if (particle.age >= particle.lifeTime) {
                    // Recycle
                    this._stockParticles.push(particles.splice(index, 1)[0]);
                    index--;
                    continue;
                } else {
                    particle.position.y += (this.emitter.position.y - particle.position.y) / 100;
                    particle.position.x += (this.emitter.position.x - particle.position.x) / 100;
                    particle.position.z += (this.emitter.position.z - particle.position.z) / 100;
                }
            }
        };
    }
}
