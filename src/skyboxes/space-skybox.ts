import { Scene, MeshBuilder, StandardMaterial, Color3, Texture, CubeTexture } from '@babylonjs/core';

export default class SpaceSkybox {
    private SPACE_TEXTURE_PATH: string = 'textures/space';

    constructor(scene: Scene) {
        const skybox = MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, scene);
        const skyboxMaterial = new StandardMaterial('skyBox', scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture(this.SPACE_TEXTURE_PATH, scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
    }
}
