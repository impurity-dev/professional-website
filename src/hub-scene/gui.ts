import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';

export type OnLaunch = () => void;
export type StartGuiProps = {};
export type TriggerType = {
    type: 'launch';
    toggle: boolean;
};
export type ActionType = { type: 'launch' };

export class Start2Gui {
    public readonly triggerAction: BABYLON.Observable<TriggerType> = new BABYLON.Observable();
    public readonly onAction: BABYLON.Observable<ActionType> = new BABYLON.Observable();
    private readonly gui: GUI.AdvancedDynamicTexture;

    constructor(
        readonly scene: BABYLON.Scene,
        readonly props: StartGuiProps,
    ) {
        this.gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.gui.idealHeight = 1920;

        const toggleLaunchText = this.createToggleLaunchText();
        this.gui.addControl(toggleLaunchText);

        this.triggerAction.add((event) => {
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
        return text;
    };
}
