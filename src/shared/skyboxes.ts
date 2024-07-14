import * as BABYLON from '@babylonjs/core';

export const purpleSpace = (props: { scene: BABYLON.Scene }) => {
    const { scene } = props;
    const id = 'SpaceSkybox';
    const skyboxMaterial = new BABYLON.StandardMaterial(`${id} Material`, scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('textures/skyboxes/space', scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    const skybox = BABYLON.MeshBuilder.CreateBox(`${id} Mesh`, { size: 10000 }, scene);
    skybox.infiniteDistance = true;
    skybox.material = skyboxMaterial;
    skybox.metadata = 'skybox';
    return skybox;
};
