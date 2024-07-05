import { Color4, MeshBuilder, Scene, SolidParticle, SolidParticleSystem, Vector3 } from '@babylonjs/core';
import { randomPointOnCylinder } from '../shared/utils.js';

export class WarpspeedStarsSolidParticles extends SolidParticleSystem {
    public speed = 1;
    public recycleDepth: number = 1;
    public height: number = 1;
    public radius: number = 1;

    constructor(
        readonly scene: Scene,
        height: number,
        radius: number,
    ) {
        super('WarpspeedStarsSolidParticles', scene);
        this.height = height;
        this.radius = radius;

        const sphere = MeshBuilder.CreateSphere('Sphere', { diameter: 0.5, segments: 1 });
        this.addShape(sphere, 1_000);
        sphere.dispose();

        this.buildMesh();
    }

    public set emitter(position: Vector3) {
        this.mesh.position = position;
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
        if (particle.position.z < this.recycleDepth + 300) {
            particle.scale = new Vector3(0.5, 0.5, 50);
        }
        const speed = new Vector3(0, 0, particle.velocity.z - this.speed);
        particle.position = particle.position.add(speed);
        return particle;
    }

    public initParticles(): void {
        for (let i = 0; i < this.nbParticles; i++) {
            this.recycleParticle(this.particles[i]);
        }
    }

    public recycleParticle(particle: SolidParticle): SolidParticle {
        particle.position = randomPointOnCylinder(this.height, this.radius);
        particle.scale = new Vector3(1, 1, 1);
        particle.color = new Color4(1, 1, 1, 1);
        return particle;
    }
}
