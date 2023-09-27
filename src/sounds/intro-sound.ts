import { Scene, Sound } from '@babylonjs/core';
import { getSound } from '../managers/asset-manager';

export class IntroSound extends Sound {
    constructor(readonly scene: Scene) {
        super('IntroSound', getSound('trailer.mp3'), scene, null, {
            loop: false,
            autoplay: true,
        });
    }
}
