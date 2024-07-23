import * as BABYLON from '@babylonjs/core';
import * as events from './events';

export const sounds = (props: { scene: BABYLON.Scene; event: events.Events }) => {
    const { scene, event } = props;
    new BABYLON.Sound('loop', './sounds/stellar-drift-loop.mp3', scene, null, {
        loop: true,
        autoplay: true,
    });
    const hover = new BABYLON.Sound('hover', './sounds/confirm-02.wav', scene, null, {
        loop: false,
        autoplay: false,
    });
    const click = new BABYLON.Sound('click', './sounds/confirm-01.wav', scene, null, {
        loop: false,
        autoplay: false,
    });
    event.onHover.add(() => hover.play());
    event.onClick.add(() => click.play());
};
