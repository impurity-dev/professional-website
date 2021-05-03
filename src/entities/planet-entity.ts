import { Mesh, Scene, TransformNode } from '@babylonjs/core';
import { PlanetMaterial } from './../materials/planet-materials';

export default class PlanetEntity extends TransformNode {
    public readonly sphere: Mesh;

    constructor(readonly scene: Scene, diameter: number) {
        super('Planet');
        const sphere: Mesh = Mesh.CreateSphere('Planet Sphere', 100, diameter, scene);
        sphere.parent = this;
        sphere.material = new PlanetMaterial(scene);
        sphere.metadata = 'planet';
    }
}
