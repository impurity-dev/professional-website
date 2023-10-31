import { FreeCamera, HemisphericLight, Vector3 } from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from './state.js';
import { ExternalAssetManager } from '../managers/entity-manager.js';

export class StartState extends State {
    run = async (): Promise<void> => {
        const externalAssetManager = new ExternalAssetManager(this.assetManager);
        const asset = { file: 'Column_1.obj', directory: 'objects/low-poly/' };
        externalAssetManager.queue(asset);
        await externalAssetManager.load();

        for (let i = 0; i < 10; i++) {
            const column1 = externalAssetManager.get(asset);
            column1.position = new Vector3(i, 0, 0);
        }

        const camera = new FreeCamera('Camera', new Vector3(0, 5, -10), this.scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl();

        new IntroSound(this.scene);
        new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        new SpaceSkybox(this.scene);
    };
}
