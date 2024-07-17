import * as BABYLON from '@babylonjs/core';

export const trailerMusic = (props: { scene: BABYLON.Scene }) => {
    const { scene } = props;
    return new BABYLON.Sound('IntroSound', `./sounds/trailer.mp3`, scene, null, {
        loop: false,
        autoplay: true,
    });
};
