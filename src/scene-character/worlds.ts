import * as localSm from './state-machines';
import * as BABYLON from '@babylonjs/core';
import { filter, take, tap } from 'rxjs';
import * as sharedModels from '../models';
import * as em from '../models/entity-manager.js';
import * as localEvents from './events.js';
import * as localModels from './models.js';

export const world = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; target: BABYLON.Vector3; events: localEvents.Events }) => {
    const { scene, entityManager, target, events } = props;
    const clubAnimation = clubAnimations();
    globalLights({ scene, clubAnimation });
    pointLights({ scene, clubAnimation });
    characterSpotLight({ scene, target, events });
    clubSpotLight({ scene, target, events, clubAnimation });
    cantina({ scene, entityManager });
    const characters = characterMetadata({ scene, entityManager, target });
    cutscene({ scene, entityManager, target, events });
    return {
        characters,
    };
};

type ClubAnimation = {
    color: BABYLON.Color3;
    diffuseAnim: BABYLON.Animation;
    specularAnim: BABYLON.Animation;
};
const clubAnimations = (): ClubAnimation => {
    const color = new BABYLON.Color3(1, 0, 0);
    const colorKeys = [
        {
            frame: 0,
            value: color,
        },
        {
            frame: 10,
            value: new BABYLON.Color3(1, 1, 0),
        },
        {
            frame: 20,
            value: new BABYLON.Color3(1, 0, 1),
        },
        {
            frame: 30,
            value: new BABYLON.Color3(0, 1, 1),
        },
        {
            frame: 40,
            value: new BABYLON.Color3(0, 0, 1),
        },
        {
            frame: 50,
            value: new BABYLON.Color3(1, 1, 0),
        },
        {
            frame: 60,
            value: color,
        },
    ];
    const diffuseAnim = new BABYLON.Animation('color', 'diffuse', 60, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    diffuseAnim.setKeys(colorKeys);
    const specularAnim = new BABYLON.Animation('color', 'specular', 60, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    specularAnim.setKeys(colorKeys);
    return {
        color,
        diffuseAnim,
        specularAnim,
    };
};

const pointLights = (props: { scene: BABYLON.Scene; clubAnimation: ClubAnimation }) => {
    const { scene, clubAnimation } = props;
    const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 1, 1), scene);
    light.intensity = 0.5;
    light.radius = 10;
    light.diffuse = clubAnimation.color;
    light.specular = clubAnimation.color;
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
    light.animations = [flickerAnim, clubAnimation.specularAnim, clubAnimation.diffuseAnim];
    scene.beginAnimation(light, 0, 60, true, 0.25);
};

const characterSpotLight = (props: { scene: BABYLON.Scene; target: BABYLON.Vector3; events: localEvents.Events }) => {
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
            filter((state) => state.type === 'dialogue' && state.props.index === 0),
            take(1),
            tap(() => scene.beginAnimation(characterSpotlight, 0, 60, false, 2)),
        )
        .subscribe();
};

const clubSpotLight = (props: { scene: BABYLON.Scene; target: BABYLON.Vector3; events: localEvents.Events; clubAnimation: ClubAnimation }) => {
    const { scene, target, clubAnimation } = props;
    const clubStartDirection = new BABYLON.Vector3(0, -1, 5);
    const light = new BABYLON.SpotLight('clubSpotlight', new BABYLON.Vector3(target.x, target.y + 2, target.z), clubStartDirection, Math.PI / 12, 1, scene);
    light.diffuse = clubAnimation.color;
    light.specular = clubAnimation.color;
    light.intensity = 500;
    const clubSpotlightAnim = new BABYLON.Animation(
        'dimSpotlight',
        'direction',
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
    );
    clubSpotlightAnim.setKeys([
        { frame: 0, value: clubStartDirection },
        { frame: 15, value: new BABYLON.Vector3(5, -1, 5) },
        { frame: 30, value: new BABYLON.Vector3(5, -1, -5) },
        { frame: 45, value: new BABYLON.Vector3(-5, -1, -5) },
        { frame: 60, value: clubStartDirection },
    ]);
    light.animations = [clubSpotlightAnim, clubAnimation.diffuseAnim, clubAnimation.specularAnim];
    scene.beginAnimation(light, 0, 60, true, 0.5);
};

const globalLights = (props: { scene: BABYLON.Scene; clubAnimation: ClubAnimation }) => {
    const { scene, clubAnimation } = props;
    const light = new BABYLON.DirectionalLight('directionLight', new BABYLON.Vector3(0, 1, 1), scene);
    light.intensity = 0.5;
    light.diffuse = clubAnimation.color;
    light.specular = clubAnimation.color;
    light.animations = [clubAnimation.diffuseAnim, clubAnimation.specularAnim];
    scene.beginAnimation(light, 0, 60, true, 0.5);
};

const cantina = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    const model = localModels.cantina({ scene, entityManager });
    model.transform.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
    model.transform.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 2);
    return model;
};

const characterMetadata = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; target: BABYLON.Vector3 }) => {
    const { scene, entityManager, target } = props;
    const list: localSm.CharacterMetadata[] = [
        // Male
        { type: 'adventurer', gender: 'male', model: sharedModels.maleAdventurer({ scene, entityManager }) },
        { type: 'beach', gender: 'male', model: sharedModels.maleBeach({ scene, entityManager }) },
        { type: 'casual', gender: 'male', model: sharedModels.maleCasual({ scene, entityManager }) },
        { type: 'hoodie', gender: 'male', model: sharedModels.maleHoodie({ scene, entityManager }) },
        { type: 'farmer', gender: 'male', model: sharedModels.maleFarmer({ scene, entityManager }) },
        { type: 'king', gender: 'male', model: sharedModels.maleKing({ scene, entityManager }) },
        { type: 'punk', gender: 'male', model: sharedModels.malePunk({ scene, entityManager }) },
        { type: 'spacesuit', gender: 'male', model: sharedModels.maleSpacesuit({ scene, entityManager }) },
        { type: 'suit', gender: 'male', model: sharedModels.maleSuit({ scene, entityManager }) },
        { type: 'swat', gender: 'male', model: sharedModels.maleSwat({ scene, entityManager }) },
        { type: 'worker', gender: 'male', model: sharedModels.maleWorker({ scene, entityManager }) },
        // Female
        { type: 'adventurer', gender: 'female', model: sharedModels.femaleAdventurer({ scene, entityManager }) },
        { type: 'casual', gender: 'female', model: sharedModels.femaleCasual({ scene, entityManager }) },
        { type: 'formal', gender: 'female', model: sharedModels.femaleFormal({ scene, entityManager }) },
        { type: 'medieval', gender: 'female', model: sharedModels.femaleMedieval({ scene, entityManager }) },
        { type: 'punk', gender: 'female', model: sharedModels.femalePunk({ scene, entityManager }) },
        { type: 'sciFi', gender: 'female', model: sharedModels.femaleSciFi({ scene, entityManager }) },
        { type: 'soldier', gender: 'female', model: sharedModels.femaleSoldier({ scene, entityManager }) },
        { type: 'suit', gender: 'female', model: sharedModels.femaleSuit({ scene, entityManager }) },
        { type: 'witch', gender: 'female', model: sharedModels.femaleWitch({ scene, entityManager }) },
        { type: 'worker', gender: 'female', model: sharedModels.femaleWorker({ scene, entityManager }) },
    ];
    list.forEach(({ model }) => {
        model.transform.position = new BABYLON.Vector3(target.x, 0, target.z);
        model.onLoad
            .pipe(
                take(1),
                tap(() => model.animationGroups.find((a) => a.name === 'Idle').play(true)),
                tap(() => model.transform.setEnabled(false)),
            )
            .subscribe();
    });
    return list;
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
            filter((state) => state.type === 'dialogue' && state.props.index == 0),
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
