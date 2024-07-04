import * as BABYLON from '@babylonjs/core';
import * as events from './events';

type MouseState = { current: BABYLON.IMouseEvent; last?: BABYLON.IMouseEvent } | undefined;
export class FighterController {
    private readonly deviceManager: BABYLON.DeviceSourceManager;
    private readonly fighterEvents: events.FighterEvents;

    constructor(props: { scene: BABYLON.Scene; events: events.FighterEvents }) {
        const { scene, events } = props;
        this.fighterEvents = events;
        this.deviceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        // scene.onPointerDown = (event) => {
        //     const engine = scene.getEngine() as BABYLON.Engine;
        //     if (event.button === 0) engine.enterPointerlock();
        //     if (event.button === 1) engine.exitPointerlock();
        // };

        let mouseState = undefined;
        scene.onPointerObservable.add((pointerInfo) => {
            mouseState = { current: pointerInfo.event, last: mouseState?.last || pointerInfo.event };
        });
        let keyboard: BABYLON.DeviceSource<BABYLON.DeviceType.Keyboard> | undefined;
        this.deviceManager.onDeviceConnectedObservable.add((device) => {
            if (device.deviceType !== BABYLON.DeviceType.Keyboard) return;
            keyboard = device;
        });
        scene.onBeforeRenderObservable.add(() => {
            const aimInputs = this.aim(scene, mouseState);
            events.controls.notifyObservers({
                pitch: aimInputs?.pitch || 0,
                yaw: aimInputs?.yaw || 0,
                w: keyboard?.getInput(87) === 1,
                a: keyboard?.getInput(65) === 1,
                s: keyboard?.getInput(83) === 1,
                d: keyboard?.getInput(68) === 1,
                leftShift: keyboard?.getInput(16) === 1,
            });
        });
    }

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
