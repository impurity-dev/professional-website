import { TransformNode, Scene, Mesh } from '@babylonjs/core';

export default class PlanetEntity extends TransformNode {
    public readonly sphere: Mesh;

    constructor(private readonly scene: Scene, id: string) {
        super(id);
        const sphere: Mesh = Mesh.CreateSphere(`${id} Sphere`, 10, 1, scene);
        sphere.parent = this;
    }
}
