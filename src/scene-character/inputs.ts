import * as BABYLON from '@babylonjs/core';
import { filter, take, takeUntil, tap, withLatestFrom } from 'rxjs';
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
    const handleTextChange = () => {
        fromBabylonObservable(keyboard.onInputChangedObservable)
            .pipe(
                withLatestFrom(events.state$),
                tap(([keyEvent, state]) => {
                    if (keyboard.getInput(SPACE) === 1 && keyEvent.type == 'keydown' && !currentKey) {
                        currentKey = keyEvent.code;
                        events.state$.next({
                            type: 'dialogue',
                            diaglogue: {
                                index: state.type === 'dialogue' ? state.diaglogue.index + 1 : 0,
                            },
                        });
                    }
                    if (keyEvent.type == 'keyup' && currentKey == keyEvent.code) currentKey = undefined;
                }),
                takeUntil(events.destroy$),
            )
            .subscribe();
    };
    events.state$
        .pipe(
            filter((state) => state.type === 'dialogue' && state.diaglogue.index === 0),
            take(1),
            tap(() => handleTextChange()),
        )
        .subscribe();
};
