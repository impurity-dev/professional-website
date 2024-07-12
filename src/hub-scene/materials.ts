import * as BABYLON from '@babylonjs/core';

export const fresnel = (scene: BABYLON.Scene) => {
    const fresnel = new BABYLON.StandardMaterial('fres', scene);
    fresnel.diffuseColor = new BABYLON.Color3(0, 0.8, 0.8);
    fresnel.emissiveColor = new BABYLON.Color3(0, 1, 1);
    fresnel.alpha = 0.2;
    fresnel.specularPower = 16;
    fresnel.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    fresnel.reflectionFresnelParameters.bias = 0.1;
    fresnel.opacityFresnelParameters = new BABYLON.FresnelParameters();
    fresnel.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    fresnel.disableLighting = true;
    return fresnel;
};

export const ripple = (props: { scene: BABYLON.Scene }) => {
    const { scene } = props;
    let time = 0;
    const material = new BABYLON.ShaderMaterial('portal', scene, 'portal', {
        attributes: ['position', 'normal', 'uv'],
        uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection', 'time', 'tex0'],
        samplers: ['tex0'],
    });
    const mainTexture = new BABYLON.Texture('./portraits/recruiter.png', scene);
    material.setFloat('duration', 8.0);
    material.setTexture('tex0', mainTexture);
    scene.registerBeforeRender(() => {
        material.setFloat('time', time);
        time += 0.01;
    });
    return material;
};
