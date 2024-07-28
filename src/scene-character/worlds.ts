import * as BABYLON from '@babylonjs/core';
import { filter, take, tap } from 'rxjs';
import * as sharedModels from '../models';
import * as em from '../models/entity-manager.js';
import * as localEvents from './events.js';
import * as localModels from './models.js';

export const world = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; target: BABYLON.Vector3; events: localEvents.Events }) => {
    const { scene, entityManager, target, events } = props;
    globalLights({ scene });
    pointLights({ scene });
    spotLights({ scene, target, events });
    cantina({ scene, entityManager });
    const characterLookup = characters({ scene, entityManager, target });
    cutscene({ scene, entityManager, target, events });
    return {
        characterLookup,
    };
};

const pointLights = (props: { scene: BABYLON.Scene }) => {
    const { scene } = props;
    const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 1, 1), scene);
    light.intensity = 0.5;
    light.radius = 10;
    const color = new BABYLON.Color3(1, 0.5, 0);
    light.diffuse = color;
    light.specular = color;
    const colorKeys = [
        {
            frame: 0,
            value: color,
        },
        {
            frame: 30,
            value: new BABYLON.Color3(1, 0, 1),
        },
        {
            frame: 60,
            value: color,
        },
    ];
    const diffuseAnim = new BABYLON.Animation('color', 'diffuse', 30, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    diffuseAnim.setKeys(colorKeys);
    const specularAnim = new BABYLON.Animation('color', 'specular', 30, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    specularAnim.setKeys(colorKeys);
    const flickerAnim = new BABYLON.Animation('flicker', 'intensity', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    flickerAnim.setKeys([
        {
            frame: 0,
            value: 5,
        },
        {
            frame: 30,
            value: 20,
        },
        {
            frame: 60,
            value: 5,
        },
    ]);
    light.animations = [flickerAnim, specularAnim, diffuseAnim];
    scene.beginAnimation(light, 0, 60, true, 0.25);
};

const spotLights = (props: { scene: BABYLON.Scene; target: BABYLON.Vector3; events: localEvents.Events }) => {
    const { scene, target, events } = props;
    const characterSpotlight = new BABYLON.SpotLight(
        'characterSpotlight',
        new BABYLON.Vector3(target.x, target.y + 2, target.z),
        new BABYLON.Vector3(0, -1, 0),
        Math.PI,
        10,
        scene,
    );
    const intensity = 10;
    characterSpotlight.intensity = intensity;
    const characterSpotlightAnim = new BABYLON.Animation(
        'dimSpotlight',
        'intensity',
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
    );
    characterSpotlightAnim.setKeys([
        { frame: 0, value: intensity },
        { frame: 60, value: 0 },
    ]);
    characterSpotlight.animations = [characterSpotlightAnim];
    events.state$
        .pipe(
            filter((state) => state.type === 'dialogue' && state.diaglogue.index === 0),
            take(1),
            tap(() => scene.beginAnimation(characterSpotlight, 0, 60, false, 2)),
        )
        .subscribe();
};

const globalLights = (props: { scene: BABYLON.Scene }) => {
    const { scene } = props;
    const light = new BABYLON.DirectionalLight('directionLight', new BABYLON.Vector3(0, 1, 1), scene);
    light.intensity = 0.5;
    const color = new BABYLON.Color3(1, 0.5, 0);
    light.diffuse = color;
    light.specular = color;
};

const cantina = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    const model = localModels.cantina({ scene, entityManager });
    model.transform.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
    model.transform.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 2);
    return model;
};

const characters = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; target: BABYLON.Vector3 }) => {
    const { scene, entityManager, target } = props;
    const lookup = {
        male: {
            adventurer: sharedModels.maleAdventurer({ scene, entityManager }),
            beach: sharedModels.maleBeach({ scene, entityManager }),
            casual: sharedModels.maleCasual({ scene, entityManager }),
            farmer: sharedModels.maleFarmer({ scene, entityManager }),
            hoodie: sharedModels.maleHoodie({ scene, entityManager }),
            king: sharedModels.maleKing({ scene, entityManager }),
            punk: sharedModels.malePunk({ scene, entityManager }),
            spacesuit: sharedModels.maleSpacesuit({ scene, entityManager }),
            suit: sharedModels.maleSuit({ scene, entityManager }),
            swat: sharedModels.maleSwat({ scene, entityManager }),
            worker: sharedModels.maleWorker({ scene, entityManager }),
        },
        female: {
            adventurer: sharedModels.femaleAdventurer({ scene, entityManager }),
            casual: sharedModels.femaleCasual({ scene, entityManager }),
            formal: sharedModels.femaleFormal({ scene, entityManager }),
            medieval: sharedModels.femaleMedieval({ scene, entityManager }),
            punk: sharedModels.femalePunk({ scene, entityManager }),
            sciFi: sharedModels.femaleSciFi({ scene, entityManager }),
            soldier: sharedModels.femaleSoldier({ scene, entityManager }),
            suit: sharedModels.femaleSuit({ scene, entityManager }),
            witch: sharedModels.femaleWitch({ scene, entityManager }),
            worker: sharedModels.femaleWorker({ scene, entityManager }),
        },
    };
    Object.entries(lookup).forEach(([, chunk]) => {
        Object.entries(chunk).forEach(([, model]) => {
            model.transform.position = new BABYLON.Vector3(target.x, 0, target.z);
            model.onLoad
                .pipe(
                    take(1),
                    tap(() => model.animationGroups.find((a) => a.name === 'Idle').play(true)),
                    tap(() => model.transform.setEnabled(false)),
                )
                .subscribe();
        });
    });
    return lookup;
};

const cutscene = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; target: BABYLON.Vector3; events: localEvents.Events }) => {
    const { scene, entityManager, target, events } = props;
    const george = sharedModels.george({ scene, entityManager });
    george.transform.position = new BABYLON.Vector3(target.x, target.y - 1, target.z + 5.5);
    const scale = 0.25;
    george.transform.scaling = new BABYLON.Vector3(scale, scale, scale);
    george.transform.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
    const walkAnimation = new BABYLON.Animation(
        'georgeWalk',
        'position.z',
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
    );
    walkAnimation.setKeys([
        { frame: 0, value: george.transform.position.z },
        { frame: 60, value: target.z + 1.6 },
    ]);
    george.transform.animations = [walkAnimation];

    events.state$
        .pipe(
            filter((state) => state.type === 'dialogue' && state.diaglogue.index == 0),
            take(1),
            tap(() => {
                const walk = george.animationGroups.find((a) => a.name === 'Walk');
                const idle = george.animationGroups.find((a) => a.name === 'Idle');
                walk.enableBlending = true;
                walk.blendingSpeed = 0.1;
                idle.enableBlending = true;
                idle.blendingSpeed = 0.1;
                walk.play(true);
                scene.beginAnimation(george.transform, 0, 60, false, 0.5, () => {
                    walk.stop();
                    idle.play(true);
                });
            }),
        )
        .subscribe();
};
