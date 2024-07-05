import * as BABYLON from '@babylonjs/core';
import * as assets from '../assets';

export class Sounds {
    public readonly music: BABYLON.Sound;
    public readonly hover: BABYLON.Sound;
    public readonly click: BABYLON.Sound;

    constructor(props: { scene: BABYLON.Scene }) {
        const { scene } = props;
        this.music = new BABYLON.Sound('loop', assets.startLoop, scene, null, {
            loop: true,
            autoplay: true,
        });
        this.hover = new BABYLON.Sound('hover', assets.menuHover, scene, null, {
            loop: false,
            autoplay: false,
        });
        this.click = new BABYLON.Sound('click', assets.menuClick, scene, null, {
            loop: false,
            autoplay: false,
        });
    }
}
