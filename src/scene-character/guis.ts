import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as localEvents from './events';

export const gui = (props: { scene: BABYLON.Scene; events: localEvents.Events }) => {
    const { scene, events } = props;
    const ui = createUi({ scene });
    createInstructions({ ui });
};

const createUi = (props: { scene: BABYLON.Scene }) => {
    const { scene } = props;
    const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
    ui.idealHeight = 1080;
    return ui;
};

const createInstructions = (props: { ui: GUI.AdvancedDynamicTexture }) => {
    const { ui } = props;
    const textBlock = new GUI.TextBlock('title', 'Character Selection');
    textBlock.fontFamily = 'Zen Dots';
    textBlock.color = 'white';
    textBlock.fontSize = 30;
    textBlock.top = -500;
    ui.addControl(textBlock);
};
