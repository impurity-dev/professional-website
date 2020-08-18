import { Scene } from '@babylonjs/core/scene';
import { FresnelParameters } from '@babylonjs/core/Materials/fresnelParameters';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math';

function createHologramMaterial(scene: Scene): StandardMaterial {
    const xray_mat = new StandardMaterial('xray', scene);
    xray_mat.emissiveColor = new Color3(1, 1, 1);
    xray_mat.alpha = 0.1;
    const fresnel_params = new FresnelParameters();
    fresnel_params.isEnabled = true;
    fresnel_params.leftColor = new Color3(0.5, 0.6, 1);
    fresnel_params.rightColor = new Color3(0, 0, 0);
    fresnel_params.power = 2;
    fresnel_params.bias = 0.1;
    const fresnel_params2 = new FresnelParameters();
    fresnel_params2.isEnabled = true;
    fresnel_params2.leftColor = new Color3(1, 1, 1);
    fresnel_params2.rightColor = new Color3(0.2, 0.2, 0.2);
    fresnel_params2.power = 2;
    fresnel_params2.bias = 0.5;
    xray_mat.emissiveFresnelParameters = fresnel_params;
    xray_mat.opacityFresnelParameters = fresnel_params2;
    return xray_mat;
}

export default createHologramMaterial;
