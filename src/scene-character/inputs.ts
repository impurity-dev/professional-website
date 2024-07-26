import * as BABYLON from '@babylonjs/core';
import { take, takeUntil, tap } from 'rxjs';
import { fromBabylonObservable } from '../shared/utils';
import * as localEvents from './events';

export const controller = (props: { scene: BABYLON.Scene; events: localEvents.Events }) => {
    const { scene, events } = props;
    const deviceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
    deviceManager.onDeviceConnectedObservable.add((device) => {
        if (device.deviceType !== BABYLON.DeviceType.Keyboard) return;
        handleKeyboard({ keyboard: device, events });
    });
};

const handleKeyboard = (props: { keyboard: BABYLON.DeviceSource<BABYLON.DeviceType.Keyboard>; events: localEvents.Events }) => {
    const { keyboard, events } = props;
    const SPACE = 32;
    let currentKey: string | undefined;
    const input$ = fromBabylonObservable(keyboard.onInputChangedObservable);
    const handleTextChange = () => {
        input$
            .pipe(
                tap((keyEvent) => {
                    if (keyboard.getInput(SPACE) === 1 && keyEvent.type == 'keydown' && !currentKey) {
                        currentKey = keyEvent.code;
                        events.dialogue$.next({ text: 'APPLES' });
                    }
                    if (keyEvent.type == 'keyup' && currentKey == keyEvent.code) currentKey = undefined;
                }),
                takeUntil(events.destroy$),
            )
            .subscribe();
    };
    events.startCutscene$
        .pipe(
            take(1),
            tap(() => handleTextChange()),
        )
        .subscribe();
};
