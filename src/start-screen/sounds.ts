import * as BABYLON from '@babylonjs/core';
import * as assets from '../assets';
import * as events from './events';

export const sounds = (props: { scene: BABYLON.Scene; event: events.Events }) => {
    const { scene, event } = props;
    new BABYLON.Sound('loop', assets.startLoop, scene, null, {
        loop: true,
        autoplay: true,
    });
    const hover = new BABYLON.Sound('hover', assets.menuHover, scene, null, {
        loop: false,
        autoplay: false,
    });
    const click = new BABYLON.Sound('click', assets.menuClick, scene, null, {
        loop: false,
        autoplay: false,
    });
    event.onHover.add(() => hover.play());
    event.onClick.add(() => click.play());
};
