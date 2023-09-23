import { Mesh, Scene, TransformNode, MeshBuilder } from '@babylonjs/core';
import { PlanetMaterial } from './../materials/planet-material';

export default class PlanetEntity extends TransformNode {
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
