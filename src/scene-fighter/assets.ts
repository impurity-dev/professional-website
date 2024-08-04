import * as utils from '../shared/utils';
import * as BABYLON from '@babylonjs/core';
import * as localEvents from './events';
import { AssetFactory, ContainerNodeAsset } from '../managers/asset-factory';

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

export type FighterProps = { assetFactory: AssetFactory; events: localEvents.Events };
export const FIGHTER_ASSET: ContainerNodeAsset = { type: 'container', file: 'fighter.glb', directory: 'assets/fighter/' };
export const fighter = (props: FighterProps) => {
    const { assetFactory, events } = props;
    const fighter = assetFactory.getContainer(FIGHTER_ASSET);
    fighter.rotationQuaternion = BABYLON.Quaternion.Identity();
    events.controls.add((input) => onControls(assetFactory.scene, fighter, input));
    const fighterMat: BABYLON.PBRMaterial = assetFactory.scene.getMaterialByName('BASE') as BABYLON.PBRMaterial;
    const wingsMat: BABYLON.PBRMaterial = assetFactory.scene.getMaterialByName('WINGS') as BABYLON.PBRMaterial;
    events.controls.add((input) => rocketEffect(assetFactory.scene, [fighterMat, wingsMat], input));
    return fighter;
};

const rocketEffect = (scene: BABYLON.Scene, materials: BABYLON.PBRMaterial[], input: localEvents.ControlEvent) => {
    const { yaw, pitch, w, a, s, d, leftShift } = input;
    materials.forEach((material) => {
        const start = material.emissiveIntensity;
        const delta = scene.getEngine().getDeltaTime() / 10;
        if (leftShift) {
            material.emissiveIntensity = utils.lerp(start, 3, delta);
        } else if (w) {
            material.emissiveIntensity = utils.lerp(start, 2, delta);
        } else if (s) {
            material.emissiveIntensity = utils.lerp(start, 0, delta);
        } else {
            material.emissiveIntensity = utils.lerp(start, 1, delta);
        }
    });
};

const onControls = (scene: BABYLON.Scene, target: BABYLON.TransformNode, input: localEvents.ControlEvent) => {
    const { yaw, pitch, w, a, s, d, leftShift } = input;
    const deltaSecs = scene.getEngine().getDeltaTime() / 1000;
    // Convert Yaw and Pitch to a rotation in quaternion form
    const turn = BABYLON.Quaternion.RotationYawPitchRoll(yaw * deltaSecs * TurnSpeed, pitch * deltaSecs * TurnSpeed, 0);
    // Apply the rotation to our current rotation
    target.rotationQuaternion.multiplyInPlace(turn);
    // If we have input, compute acceleration, otherwise it's zero
    const acceleration = w ? target.forward.scale(1 * MaxThrust * deltaSecs) : target.forward.scale(MaxThrust * deltaSecs);
    // Apply acceleration to velocity
    velocity.addInPlace(acceleration);
    // Apply drag to dampen velocity
    velocity.scaleInPlace(1 - DragCoefficient * deltaSecs);
    // Apply velocity to position
    target.position.addInPlace(velocity.scale(deltaSecs));
};
