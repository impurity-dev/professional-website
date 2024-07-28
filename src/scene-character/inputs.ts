import * as BABYLON from '@babylonjs/core';
import { filter, takeUntil, tap, withLatestFrom } from 'rxjs';
import { fromBabylonObservable } from '../shared/utils';
import * as localDialogues from './dialogues';
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
    fromBabylonObservable(keyboard.onInputChangedObservable)
        .pipe(
            withLatestFrom(events.state$),
            filter(([, state]) => state.type === 'dialogue'),
            tap(([keyEvent, state]) => {
                if (state.type !== 'dialogue') return;
                if (keyboard.getInput(SPACE) === 1 && keyEvent.type == 'keydown' && !currentKey) {
                    currentKey = keyEvent.code;
                    if (state.props.index + 1 < localDialogues.robotStates.length) {
                        events.state$.next({
                            type: 'dialogue',
                            props: {
                                index: state.props.index + 1,
                            },
                        });
                    } else {
                        events.state$.next({ type: 'exit' });
                    }
                }
                if (keyEvent.type == 'keyup' && currentKey == keyEvent.code) currentKey = undefined;
            }),
            takeUntil(events.destroy$),
        )
        .subscribe();
};
