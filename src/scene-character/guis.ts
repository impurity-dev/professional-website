import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { filter, take, tap } from 'rxjs';
import * as dialogues from '../dialogues';
import * as localEvents from './events';

export const gui = (props: { scene: BABYLON.Scene; events: localEvents.Events }) => {
    const { scene, events } = props;
    const ui = createUI({ scene });
    const title = createTitle({ ui });
    const instructions = createInstructions({ ui });
    const dialogueBox = createDialogueBox({ ui, events });
    const startCutSceneButton = createStartCutSceneButton({ ui, events });
    animateOnStartCutscene({ scene, events, title, instructions, startCutSceneButton });
    return {
        dialogueBox,
    };
};

const createUI = (props: { scene: BABYLON.Scene }) => {
    const { scene } = props;
    const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
    ui.idealHeight = 1080;
    return ui;
};

const createDialogueBox = (props: { ui: GUI.AdvancedDynamicTexture; events: localEvents.Events }) => {
    const { ui, events } = props;
    const dialogueBox = new dialogues.DialogueBox({ ui });
    dialogueBox.toggle(false);
    events.state$
        .pipe(
            filter((state) => state.type === 'dialogue' && state.props.index === 0),
            take(1),
            tap(() => dialogueBox.toggle(true)),
        )
        .subscribe();
    return dialogueBox;
};

const createTitle = (props: { ui: GUI.AdvancedDynamicTexture }) => {
    const { ui } = props;
    const textBlock = new GUI.TextBlock('title', 'Character Selection');
    textBlock.fontFamily = 'Zen Dots';
    textBlock.color = 'white';
    textBlock.fontSize = 30;
    textBlock.top = -500;
    ui.addControl(textBlock);
    return textBlock;
};

const createInstructions = (props: { ui: GUI.AdvancedDynamicTexture }) => {
    const { ui } = props;
    const textBlock1 = new GUI.TextBlock('instructions', 'Use "A" and "D" to cycle through all characters.');
    textBlock1.fontFamily = 'Zen Dots';
    textBlock1.color = 'white';
    textBlock1.fontSize = 15;
    textBlock1.top = 300;
    textBlock1.left = 0;
    textBlock1.textWrapping = true;
    ui.addControl(textBlock1);
    const textBlock2 = new GUI.TextBlock('instructions', 'Use "W" and "S" to cycle through genders.');
    textBlock2.fontFamily = 'Zen Dots';
    textBlock2.color = 'white';
    textBlock2.fontSize = 15;
    textBlock2.top = 350;
    textBlock2.left = 0;
    textBlock2.textWrapping = true;
    ui.addControl(textBlock2);
    return {
        textBlock1,
        textBlock2,
    };
};

const createStartCutSceneButton = (props: { ui: GUI.AdvancedDynamicTexture; events: localEvents.Events }) => {
    const { ui, events } = props;
    const button = GUI.Button.CreateImageWithCenterTextButton('start-cutscene', 'Start', 'gui/Blue/ButtonB_Big/Button6.png');
    button.height = '40px';
    button.width = '200px';
    button.color = 'white';
    button.thickness = 0;
    button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    button.top = '500px';
    button.background = '';
    button.hoverCursor = 'pointer';
    button.onPointerEnterObservable.add(() => events.buttonHover$.next());
    button.onPointerDownObservable.add(() => {
        events.buttonClick$.next();
        events.state$.next({ type: 'dialogue', props: { index: 0 } });
    });
    ui.addControl(button);
    return button;
};

const animateOnStartCutscene = (props: {
    scene: BABYLON.Scene;
    events: localEvents.Events;
    title: GUI.TextBlock;
    instructions: {
        textBlock1: GUI.TextBlock;
        textBlock2: GUI.TextBlock;
    };
    startCutSceneButton: GUI.Button;
}) => {
    const { scene, events, title, instructions, startCutSceneButton } = props;
    const keys = [
        {
            frame: 0,
            value: 1,
        },
        {
            frame: 60,
            value: 0,
        },
    ];
    const buttonFade = new BABYLON.Animation('buttonFade', 'alpha', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    buttonFade.setKeys(keys);
    const textBlockFade = new BABYLON.Animation('buttonFade', 'alpha', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    textBlockFade.setKeys(keys);
    const animationGroup = new BABYLON.AnimationGroup('fade', scene);
    animationGroup.addTargetedAnimation(textBlockFade, title);
    animationGroup.addTargetedAnimation(textBlockFade, instructions.textBlock1);
    animationGroup.addTargetedAnimation(textBlockFade, instructions.textBlock2);
    animationGroup.addTargetedAnimation(buttonFade, startCutSceneButton);
    animationGroup.onAnimationEndObservable.add(() => {
        startCutSceneButton.dispose();
        title.dispose();
        instructions.textBlock1.dispose();
        instructions.textBlock2.dispose();
    });
    events.state$
        .pipe(
            filter((state) => state.type === 'dialogue' && state.props.index === 0),
            take(1),
            tap(() => animationGroup.play()),
        )
        .subscribe();
};
