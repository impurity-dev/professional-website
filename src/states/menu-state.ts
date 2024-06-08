import * as BABYLON from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { State } from './state.js';
import * as models from '../entities/model.js';
import { MenuGui } from '../guis/menu-gui.js';
import { MainLoopSound } from '../sounds/main-loop-sound.js';

export class MenuState extends State {
    private camera: BABYLON.ArcRotateCamera;

    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        this.camera = new BABYLON.ArcRotateCamera('Camera', 0, 0.8, 200, BABYLON.Vector3.Zero(), scene);
        this.camera.attachControl(this.gameManager.canvas, true);
        scene.activeCameras = [this.camera];

        let time = 0;
        const rate = 0.01;
        scene.registerBeforeRender(() => {
            this.camera.alpha = time;
            time += scene.getAnimationRatio() * rate;
        });

        const postEffect = new BABYLON.PostProcess('mandelbulb', 'mandelbulb', ['iTime', 'iResolution'], [], 1, this.camera);

        postEffect.onApply = (effect) => {
            effect.setVector2('iResolution', new BABYLON.Vector2(postEffect.width, postEffect.height));
            effect.setFloat('iTime', time);
        };

        new MainLoopSound(this.scene);
        await entityManager.load();
        new MenuGui(scene, {
            onStart: () => this.gameManager.goTo({ type: 'start' }),
        });
    };

    fog = () => {
        const { scene } = this;
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
        scene.fogDensity = 0.0001;
    };

    earth = () => {
        const { scene, entityManager } = this;
        return models.earth({ scene, entityManager });
    };
}