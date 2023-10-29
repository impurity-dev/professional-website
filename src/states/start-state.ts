import { FreeCamera, HemisphericLight, Vector3 } from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from './state.js';
import { Column1Entity, DetailsPlateLongEntity } from '../managers/entity-manager.js';

export class StartState extends State {
    run = async (): Promise<void> => {
        new Column1Entity(this.scene, this.assetManager);
        this.assetManager.load();
        const camera = new FreeCamera('Camera', new Vector3(0, 5, -10), this.scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl();

        new IntroSound(this.scene);
        new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        new SpaceSkybox(this.scene);
    };
}
