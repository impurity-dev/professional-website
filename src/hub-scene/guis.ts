import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as event from './events.js';

export class HubGui {
    private readonly gui: GUI.AdvancedDynamicTexture;

    constructor(props: { scene: BABYLON.Scene; event: event.HubEvents }) {
        const { scene, event } = props;
        this.gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
        this.gui.idealHeight = 1920;

        const toggleLaunchText = this.createToggleLaunchText();
        event.onTrigger.add((event) => {
            switch (event.type) {
                case 'launch': {
                    toggleLaunchText.alpha = event.toggle ? 1 : 0;
                    break;
                }
                default:
                    break;
            }
        });
    }

    private createToggleLaunchText = () => {
        const text = new GUI.TextBlock('launch-options', 'Press E to Launch');
        text.alpha = 0;
        text.top = 100;
        text.color = 'white';
        this.gui.addControl(text);
        return text;
    };
}
