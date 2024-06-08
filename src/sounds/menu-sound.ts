import { Scene, Sound } from '@babylonjs/core';
import * as assets from '../assets';

export class MenuHoverSound extends Sound {
    constructor(readonly scene: Scene) {
        super('Hover', assets.menuHover, scene, null, {
            loop: false,
            autoplay: false,
        });
    }
}

export class MenuClickSound extends Sound {
    constructor(readonly scene: Scene) {
        super('Click', assets.menuClick, scene, null, {
            loop: false,
            autoplay: false,
        });
    }
}
