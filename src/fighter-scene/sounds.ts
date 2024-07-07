import * as BABYLON from '@babylonjs/core';
import * as assets from '../assets';

export const menuHover = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('Hover', assets.menuHover, props.scene, null, {
        loop: false,
        autoplay: false,
    });

export const menuClick = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('Click', assets.menuClick, props.scene, null, {
        loop: false,
        autoplay: false,
    });
