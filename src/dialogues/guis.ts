import * as GUI from '@babylonjs/gui';

export const dialogueBox = (props: { ui: GUI.AdvancedDynamicTexture }) => {
    const { ui } = props;
    const textBlock = new GUI.TextBlock('dialogue', '');
    textBlock.fontFamily = 'Zen Dots';
    textBlock.color = 'white';
    textBlock.fontSize = 30;
    textBlock.top = 300;
    textBlock.alpha = 1;
    textBlock.textWrapping = true;
    ui.addControl(textBlock);
    return textBlock;
};
