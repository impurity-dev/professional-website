import * as BABYLON from '@babylonjs/core';
import * as assets from '../assets';

export const mainLoop = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('Loop', assets.startLoop, props.scene, null, {
        loop: true,
        autoplay: true,
    });
