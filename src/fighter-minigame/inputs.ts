import * as BABYLON from '@babylonjs/core';
import { FighterEvents } from './events';

type MouseState = { current: BABYLON.IMouseEvent; last?: BABYLON.IMouseEvent } | undefined;
export class FighterController {
    private readonly deviceManager: BABYLON.DeviceSourceManager;
    private readonly events: FighterEvents;

    constructor(props: { scene: BABYLON.Scene; events: FighterEvents }) {
        const { scene, events } = props;
        this.events = events;
        this.deviceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        scene.onPointerDown = (event) => {
            const engine = scene.getEngine() as BABYLON.Engine;
            if (event.button === 0) engine.enterPointerlock();
            if (event.button === 1) engine.exitPointerlock();
        };
        let mouseState = undefined;
        scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    // POINTERDOWN: capture the current mouse position as the `down` property
                    // Also capture it as the `last` property (effectively a drag of 0 pixels)
                    mouseState = { current: pointerInfo.event, last: pointerInfo.event };
                    break;
                case BABYLON.PointerEventTypes.POINTERUP:
                    // POINTERUP: drag has finished, so clear the mouse state
                    mouseState = undefined;
                    break;
                case BABYLON.PointerEventTypes.POINTERMOVE:
                    // POINTERMOVE: while dragging, keep the `down` drag position
                    // but continuously update the `last` drag position
                    if (mouseState) {
                        mouseState.last = pointerInfo.event;
                    }
                    break;
            }
        });
        this.deviceManager.onDeviceConnectedObservable.add((device) => {
            if (device.deviceType !== BABYLON.DeviceType.Keyboard) return;
            scene.onBeforeRenderObservable.add(() => {
                const aimInputs = this.aim(scene, mouseState);
                const moveInputs = this.move(device);
                events.controls.notifyObservers({
                    pitch: aimInputs?.pitch || 0,
                    yaw: aimInputs?.yaw || 0,
                    movement: moveInputs.movement,
                    boost: moveInputs.boost,
                });
            });
        });
    }

    move = (keyboard: BABYLON.DeviceSource<BABYLON.DeviceType.Keyboard>) => {
        const SPEED = 2;
        const W = 87;
        const S = 83;
        const LeftShift = 16;
        let movement = 0;
        let boost = 1;
        if (keyboard.getInput(W) === 1) {
            if (keyboard.getInput(LeftShift) === 1) boost += 0.5;
            movement += SPEED;
        }
        if (keyboard.getInput(S) === 1) {
            movement -= SPEED;
        }
        return { movement, boost };
    };

    aim = (scene: BABYLON.Scene, state: MouseState) => {
        if (!state) return null;
        // Get the smallest of the screen's width or height
        const screenSize = Math.min(scene.getEngine().getRenderWidth(), scene.getEngine().getRenderHeight());
        // From the screen size, define a box that is 25% of the size
        // of the screen - this is effectively the max drag range of
        // the mouse drag, from the start point, in all 4 directions
        const dragSize = 0.25 * screenSize;
        // Compute the drag difference from the starting position of the drag
        const dragX = state.last.clientX - state.current.clientX;
        // Note: +X maps to +Yaw, but +Y maps to -Pitch, so invert Y:
        const dragY = state.current.clientY - state.last.clientY;
        // Normalised the values to [-1, 1] and map them like this:
        // * X maps to yaw (turn left/right)
        // * Y maps to pitch (turn up/down)
        const yaw = BABYLON.Scalar.Clamp(dragX / dragSize, -1, 1);
        const pitch = BABYLON.Scalar.Clamp(dragY / dragSize, -1, 1);
        return { pitch, yaw };
    };
}
