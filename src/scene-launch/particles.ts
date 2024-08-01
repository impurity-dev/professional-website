import { Color4, MeshBuilder, Scene, SolidParticle, SolidParticleSystem, Vector3 } from '@babylonjs/core';
import { randomPointOnCylinder } from '../shared/utils.js';
import * as BABYLON from '@babylonjs/core';

export const warpspeed = (props: { scene: BABYLON.Scene; radius: number; height: number; position: BABYLON.Vector3; parent: BABYLON.TransformNode }) => {
    const { scene, radius, height, position, parent } = props;
    const system = new BABYLON.ParticleSystem('WarpspeedStarParticles', 10_000, scene);
    system.particleTexture = new BABYLON.Texture('textures/sun.png', scene);
    system.minLifeTime = 10;
    system.maxLifeTime = 10;
    system.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    system.minEmitPower = 200;
    system.maxEmitPower = 200;
    system.updateSpeed = 0.05;
    system.emitRate = 500;
    system.minSize = 1;
    system.maxSize = 1;
    system.isLocal = true;
    system.addColorGradient(0, new BABYLON.Color4(0, 0, 1, 0.5));
    system.addColorGradient(0.25, new BABYLON.Color4(0, 1, 1, 1));
    system.addColorGradient(1, new BABYLON.Color4(1, 0, 1, 0));
    system.createDirectedCylinderEmitter(radius, height, 0.5, new Vector3(0, 1, 0), new Vector3(0, 1, 0));
    system.preWarmCycles = 100;
    const anchor = new BABYLON.TransformNode('particle-system-anchor');
    anchor.parent = parent;
    anchor.position = position;
    anchor.rotation.x = Math.PI / 2 + Math.PI;
    system.emitter = anchor as unknown as Vector3;
    return system;
};

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
