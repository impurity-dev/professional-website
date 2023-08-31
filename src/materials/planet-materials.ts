import { ShaderMaterial, Scene } from '@babylonjs/core';

export class PlanetMaterial extends ShaderMaterial {
    constructor(readonly scene: Scene) {
        super('shader', scene, './shaders/planet', {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection'],
        });
    }
}
