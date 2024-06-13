import * as BABYLON from '@babylonjs/core';

export const fresnelMaterial = (scene: BABYLON.Scene) => {
    const fresnel = new BABYLON.StandardMaterial('fres', scene);
    fresnel.diffuseColor = new BABYLON.Color3(0, 0.8, 0.8);
    fresnel.emissiveColor = new BABYLON.Color3(0, 1, 1);
    fresnel.alpha = 0.2;
    fresnel.specularPower = 16;
    fresnel.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    fresnel.reflectionFresnelParameters.bias = 0.1;
    fresnel.opacityFresnelParameters = new BABYLON.FresnelParameters();
    fresnel.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    return fresnel;
};
