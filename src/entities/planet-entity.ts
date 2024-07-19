import { Mesh, Scene, TransformNode, MeshBuilder, ShaderMaterial } from '@babylonjs/core';

export class PlanetMaterial extends ShaderMaterial {
    private time: number = 0;

    constructor(readonly scene: Scene) {
        super('shader', scene, './shaders/planet', {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection', 'time'],
        });
        this.scene.registerBeforeRender(this.update);
    }

    private update = () => {
        this.setFloat('time', this.time);
        this.time += 0.02;
    };
}

export class PlanetEntity extends TransformNode {
    public readonly sphere: Mesh;

    constructor(
        readonly scene: Scene,
        diameter: number,
    ) {
        super('Planet');
        const sphere: Mesh = MeshBuilder.CreateSphere('Planet Sphere', { segments: 100, diameter }, scene);
        sphere.parent = this;
        sphere.metadata = 'planet';
        sphere.material = new PlanetMaterial(scene);
    }
}
