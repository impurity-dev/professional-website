import { Color4, MeshBuilder, Scene, SolidParticle, SolidParticleSystem, Vector3 } from '@babylonjs/core';
import { randomNumberBetween } from '../utils';

export default class WarpspeedStarsSolidParticles extends SolidParticleSystem {
    public speed = 1;
    public recycleDepth: number = 1;

    public set emitter(position: Vector3) {
        this.mesh.position = position;
    }

    constructor(readonly scene: Scene) {
        super('WarpspeedStarsSolidParticles', scene);

        const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 5 });
        this.addShape(sphere, 1);
        sphere.dispose();

        this.buildMesh();
    }

    public start(): void {
        this.initParticles();
        this.setParticles();
        this.scene.onAfterRenderObservable.add(() => {
            this.setParticles();
        });
    }

    public updateParticle(particle: SolidParticle): SolidParticle {
        if (particle.position.z < this.recycleDepth) {
            this.recycleParticle(particle);
        }
        const speed = new Vector3(0, 0, particle.velocity.z - this.speed);
        particle.position = particle.position.add(speed);

        return particle;
    }

    public initParticles(): void {
        for (let p = 0; p < this.nbParticles; p++) {
            this.recycleParticle(this.particles[p]);
        }
    }

    public recycleParticle(particle: SolidParticle): SolidParticle {
        particle.position = this.getRandomPoint(50, 50);
        particle.color = new Color4(Math.random(), Math.random(), Math.random(), 1);
        return particle;
    }

    public getRandomPoint(height: number, radius: number): Vector3 {
        const s = randomNumberBetween(0, 1);
        const theta = randomNumberBetween(0, 2 * Math.PI);
        const r = Math.sqrt(s) * radius;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        const z = randomNumberBetween(0, height);
        console.debug(`S: ${s} Theta: ${theta} R: ${r}`);
        return new Vector3(x, y, z);
    }
}
