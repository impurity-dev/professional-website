import * as BABYLON from '@babylonjs/core';
import { Model } from '../entities/model';
import { FighterEvents } from './events';

export class FighterController {
    private readonly deviceManager: BABYLON.DeviceSourceManager;
    private mouseState: { current: BABYLON.IMouseEvent; last?: BABYLON.IMouseEvent } = undefined;

    constructor(props: { scene: BABYLON.Scene; target: Model; events: FighterEvents }) {
        const { scene, target, events } = props;
        this.deviceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        const { deviceManager } = this;
        scene.onPointerDown = (event) => {
            const engine = scene.getEngine() as BABYLON.Engine;
            if (event.button === 0) engine.enterPointerlock();
            if (event.button === 1) engine.exitPointerlock();
        };
        scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    // POINTERDOWN: capture the current mouse position as the `down` property
                    // Also capture it as the `last` property (effectively a drag of 0 pixels)
                    this.mouseState = { current: pointerInfo.event, last: pointerInfo.event };
                    break;
                case BABYLON.PointerEventTypes.POINTERUP:
                    // POINTERUP: drag has finished, so clear the mouse state
                    this.mouseState = undefined;
                    break;
                case BABYLON.PointerEventTypes.POINTERMOVE:
                    // POINTERMOVE: while dragging, keep the `down` drag position
                    // but continuously update the `last` drag position
                    if (this.mouseState) {
                        this.mouseState.last = pointerInfo.event;
                    }
                    break;
            }
        });
        target.transform.rotationQuaternion = BABYLON.Quaternion.Identity();
        deviceManager.onDeviceConnectedObservable.add((device) => {
            if (device.deviceType === BABYLON.DeviceType.Mouse) {
                device.onInputChangedObservable.add((event) => this.onMouse(event, scene, target));
            }
            if (device.deviceType === BABYLON.DeviceType.Keyboard) {
                device.onInputChangedObservable.add((event) => this.onKeyboard(event, scene, target));
            }
        });
    }

    onKeyboard = (event: BABYLON.IKeyboardEvent, scene: BABYLON.Scene, target: Model) => {};

    onMouse = (event: BABYLON.IPointerEvent | BABYLON.IWheelEvent, scene: BABYLON.Scene, target: Model) => {
        // Our maximum acceleration (units per second per second)
        const MaxThrust = 10;
        // Our maximum turn speed (radians per second)
        const TurnSpeed = 1;
        // The drag coefficient; roughly, how much velocity we will
        // lose per second. Lower values means less drag and a more
        // realistic "newtonian physics" feel, but may not be great
        // for gameplay.
        const DragCoefficient = 0.25;
        // The ship's current velocity
        const velocity = new BABYLON.Vector3();
        const deltaSecs = scene.getEngine().getDeltaTime() / 1000;
        const mouseInput = this.mouseInputs(scene);
        if (mouseInput) {
            // Convert Yaw and Pitch to a rotation in quaternion form
            const turn = BABYLON.Quaternion.RotationYawPitchRoll(mouseInput.yaw * deltaSecs * TurnSpeed, mouseInput.pitch * deltaSecs * TurnSpeed, 0);
            // Apply the rotation to our current rotation
            target.transform.rotationQuaternion.multiplyInPlace(turn);
        }

        // If we have input, compute acceleration, otherwise it's zero
        const acceleration = mouseInput ? target.transform.forward.scale(mouseInput.thrust * MaxThrust * deltaSecs) : BABYLON.Vector3.Zero();

        // Now apply the various physics forces to move the spaceship

        // Apply acceleration to velocity
        velocity.addInPlace(acceleration);
        // Apply drag to dampen velocity
        velocity.scaleInPlace(1 - DragCoefficient * deltaSecs);
        // Apply velocity to position
        target.transform.position.addInPlace(velocity.scale(deltaSecs));
    };

    mouseInputs = (scene: BABYLON.Scene) => {
        // If the mouse isn't being pressed, return null, which means "no input"
        const { mouseState } = this;
        if (!mouseState) {
            return null;
        }

        // Get the smallest of the screen's width or height
        const screenSize = Math.min(scene.getEngine().getRenderWidth(), scene.getEngine().getRenderHeight());

        // From the screen size, define a box that is 25% of the size
        // of the screen - this is effectively the max drag range of
        // the mouse drag, from the start point, in all 4 directions
        const dragSize = 0.25 * screenSize;

        // Compute the drag difference from the starting position of the drag
        const dragX = mouseState.last.clientX - mouseState.current.clientX;
        // Note: +X maps to +Yaw, but +Y maps to -Pitch, so invert Y:
        const dragY = mouseState.current.clientY - mouseState.last.clientY;

        // Normalised the values to [-1, 1] and map them like this:
        // * X maps to yaw (turn left/right)
        // * Y maps to pitch (turn up/down)
        const yaw = BABYLON.Scalar.Clamp(dragX / dragSize, -1, 1);
        const pitch = BABYLON.Scalar.Clamp(dragY / dragSize, -1, 1);

        // Finally, return the mouse state in terms of spaceship controls
        return {
            thrust: 1,
            yaw,
            pitch,
        };
    };
}
