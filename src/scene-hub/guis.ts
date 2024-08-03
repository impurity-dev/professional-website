import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as localEvents from './events.js';
import { takeUntil, tap } from 'rxjs';

export const gui = (props: { scene: BABYLON.Scene; events: localEvents.Events }) => {
    const { scene, events } = props;
    const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
    ui.idealWidth = 1920;

    const toggleLaunchText = createToggleLaunchText({ ui });
    events.interactables$
        .pipe(
            tap((interactable) => {
                switch (interactable.type) {
                    case 'fighter': {
                        toggleLaunchText.alpha = 1;
                        break;
                    }
                    default: {
                        toggleLaunchText.alpha = 0;
                        break;
                    }
                }
            }),
            takeUntil(events.destroy$),
        )
        .subscribe();
};

const createToggleLaunchText = (props: { ui: GUI.AdvancedDynamicTexture }) => {
    const { ui } = props;
    const text = new GUI.TextBlock('launch-options', 'Press E to Launch');
    text.alpha = 0;
    text.top = 100;
    text.color = 'white';
    ui.addControl(text);
    return text;
};
