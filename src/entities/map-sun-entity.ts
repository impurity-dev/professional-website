import { Color3, Mesh, Scene, Texture, TransformNode } from '@babylonjs/core';
import { LavaMaterial } from '@babylonjs/materials';

export default class MapSunEntity extends TransformNode {
    public readonly sphere: Mesh;

    constructor(private readonly scene: Scene, diameter: number) {
        super('MapSun');
        const sphere: Mesh = Mesh.CreateSphere('Map Sun Sphere', 100, diameter, scene);
        sphere.parent = this;

        const lavaMaterial = new LavaMaterial('Lava', this.scene);
        lavaMaterial.noiseTexture = new Texture('https://www.babylonjs-playground.com/textures/lava/cloud.png', this.scene); // Set the bump texture
        lavaMaterial.diffuseTexture = new Texture('https://www.babylonjs-playground.com/textures/lava/lavatile.jpg', this.scene); // Set the diffuse texture
        lavaMaterial.speed = 1.5;
        lavaMaterial.fogColor = new Color3(1, 0, 0);
        sphere.material = lavaMaterial;
    }
}
