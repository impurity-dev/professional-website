import * as BABYLON from '@babylonjs/core';

export const menuHover = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('Hover', './sounds/confirm-02.wav', props.scene, null, {
        loop: false,
        autoplay: false,
    });

export const menuClick = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('Click', './sounds/confirm-01.wav', props.scene, null, {
        loop: false,
        autoplay: false,
    });
