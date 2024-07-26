import * as BABYLON from '@babylonjs/core';

export const buttonHover = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('hover', './sounds/confirm-02.wav', props.scene, null, {
        loop: false,
        autoplay: false,
    });
export const buttonClick = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('click', './sounds/confirm-01.wav', props.scene, null, {
        loop: false,
        autoplay: false,
    });
