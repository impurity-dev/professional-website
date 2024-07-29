import * as BABYLON from '@babylonjs/core';

export const purpleSpace = (props: { scene: BABYLON.Scene }) => {
    const { scene } = props;
    return skybox({ scene, file: 'skyboxes/purple/skybox', id: 'purple-skybox' });
};

const skybox = (props: { file: string; scene: BABYLON.Scene; id: string }) => {
    const { scene, file, id } = props;
    const skyboxMaterial = new BABYLON.StandardMaterial(`${id}-material`, scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(file, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    const skybox = BABYLON.MeshBuilder.CreateBox(`${id}-mesh`, { size: 10000 }, scene);
    skybox.infiniteDistance = true;
    skybox.material = skyboxMaterial;
    skybox.metadata = 'skybox';
    return skybox;
};
