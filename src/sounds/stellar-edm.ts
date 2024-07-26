import * as BABYLON from '@babylonjs/core';
const directory = 'sounds/stellar-confrontation-edm';

export const metoerShower = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('metoerShower', `${directory}/cosmic-clash.ogg`, props.scene, null, {
        loop: false,
        autoplay: false,
    });
export const deepSpace = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('deepSpace', `${directory}/deep-space.ogg`, props.scene, null, {
        loop: false,
        autoplay: false,
    });
export const galacticBattle = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('galacticBattle', `${directory}/galactic-battle.ogg`, props.scene, null, {
        loop: false,
        autoplay: false,
    });
export const nebula = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('nebula', `${directory}/nebula.ogg`, props.scene, null, {
        loop: false,
        autoplay: false,
    });
export const orbitalAssault = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('orbitalAssault', `${directory}/orbital-assault.ogg`, props.scene, null, {
        loop: false,
        autoplay: false,
    });
export const redDwarf = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('redDwarf', `${directory}/red-dwarf.ogg`, props.scene, null, {
        loop: false,
        autoplay: false,
    });
export const solarStorm = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('solarStorm', `${directory}/solar-storm.ogg`, props.scene, null, {
        loop: false,
        autoplay: false,
    });
export const spaceOdyssey = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('spaceOdyssey', `${directory}/space-odyssey.ogg`, props.scene, null, {
        loop: false,
        autoplay: false,
    });
export const stellarConfrontation = (props: { scene: BABYLON.Scene }) =>
    new BABYLON.Sound('stellarConfrontation', `${directory}/stellar-confrontation.ogg`, props.scene, null, {
        loop: false,
        autoplay: false,
    });
