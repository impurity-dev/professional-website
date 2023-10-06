import { ShaderMaterial, Scene } from '@babylonjs/core';

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
