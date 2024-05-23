import { Scene, Sound } from '@babylonjs/core';
import * as assets from '../assets';

export class MainLoopSound extends Sound {
    constructor(readonly scene: Scene) {
        super('Loop', assets.startLoop, scene, null, {
            loop: true,
            autoplay: true,
        });
    }
}
