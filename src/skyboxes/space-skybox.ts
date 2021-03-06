import { Scene, MeshBuilder, StandardMaterial, Color3, Texture, CubeTexture } from '@babylonjs/core';

export default class SpaceSkybox {
    private SPACE_TEXTURE_PATH: string = 'textures/skyboxes/space';

    constructor(readonly scene: Scene, readonly id: string = 'SpaceSkybox') {
        const skyboxMaterial = new StandardMaterial(`${id} Material`, scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skyboxMaterial.reflectionTexture = new CubeTexture(this.SPACE_TEXTURE_PATH, scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);

        const skybox = MeshBuilder.CreateBox(`${id} Mesh`, { size: 10000 }, scene);
        skybox.infiniteDistance = true;
        skybox.material = skyboxMaterial;
    }
}
