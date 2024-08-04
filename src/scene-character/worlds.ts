import * as assets from './assets';
import * as localSm from './state-machines';
import * as BABYLON from '@babylonjs/core';
import { filter, take, tap } from 'rxjs';
import * as localEvents from './events.js';
import { AssetFactory } from '../managers/asset-factory';

export const world = (props: { assetFactory: AssetFactory; target: BABYLON.Vector3; events: localEvents.Events }) => {
    const { assetFactory, target, events } = props;
    const clubAnimation = clubAnimations();
    globalLights({ assetFactory, clubAnimation });
    pointLights({ assetFactory, clubAnimation });
    characterSpotLight({ assetFactory, target, events });
    clubSpotLight({ assetFactory, target, events, clubAnimation });
    cantina({ assetFactory });
    const characters = characterMetadata({ assetFactory, target });
    cutscene({ assetFactory, target, events });
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

const pointLights = (props: { assetFactory: AssetFactory; clubAnimation: ClubAnimation }) => {
    const { assetFactory, clubAnimation } = props;
    const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 1, 1), assetFactory.scene);
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
    assetFactory.scene.beginAnimation(light, 0, 60, true, 0.25);
};

const characterSpotLight = (props: { assetFactory: AssetFactory; target: BABYLON.Vector3; events: localEvents.Events }) => {
    const { assetFactory, target, events } = props;
    const characterSpotlight = new BABYLON.SpotLight(
        'characterSpotlight',
        new BABYLON.Vector3(target.x, target.y + 2, target.z),
        new BABYLON.Vector3(0, -1, 0),
        Math.PI,
        10,
        assetFactory.scene,
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
            tap(() => assetFactory.scene.beginAnimation(characterSpotlight, 0, 60, false, 2)),
        )
        .subscribe();
};

const clubSpotLight = (props: { assetFactory: AssetFactory; target: BABYLON.Vector3; events: localEvents.Events; clubAnimation: ClubAnimation }) => {
    const { assetFactory, target, clubAnimation } = props;
    const clubStartDirection = new BABYLON.Vector3(0, -1, 5);
    const light = new BABYLON.SpotLight(
        'clubSpotlight',
        new BABYLON.Vector3(target.x, target.y + 2, target.z),
        clubStartDirection,
        Math.PI / 12,
        1,
        assetFactory.scene,
    );
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
    assetFactory.scene.beginAnimation(light, 0, 60, true, 0.5);
};

const globalLights = (props: { assetFactory: AssetFactory; clubAnimation: ClubAnimation }) => {
    const { assetFactory, clubAnimation } = props;
    const light = new BABYLON.DirectionalLight('directionLight', new BABYLON.Vector3(0, 1, 1), assetFactory.scene);
    light.intensity = 0.5;
    light.diffuse = clubAnimation.color;
    light.specular = clubAnimation.color;
    light.animations = [clubAnimation.diffuseAnim, clubAnimation.specularAnim];
    assetFactory.scene.beginAnimation(light, 0, 60, true, 0.5);
};

const cantina = (props: { assetFactory: AssetFactory }) => {
    const { assetFactory } = props;
    const model = assets.cantina({ assetFactory });
    model.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
    model.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 2);
    return model;
};

const characterMetadata = (props: { assetFactory: AssetFactory; target: BABYLON.Vector3 }) => {
    const { assetFactory, target } = props;
    const list: localSm.CharacterMetadata[] = [
        // Male
        { type: 'adventurer', gender: 'male', model: assets.maleAdventurer({ assetFactory }) },
        { type: 'beach', gender: 'male', model: assets.maleBeach({ assetFactory }) },
        { type: 'casual', gender: 'male', model: assets.maleCasual({ assetFactory }) },
        { type: 'hoodie', gender: 'male', model: assets.maleHoodie({ assetFactory }) },
        { type: 'farmer', gender: 'male', model: assets.maleFarmer({ assetFactory }) },
        { type: 'king', gender: 'male', model: assets.maleKing({ assetFactory }) },
        { type: 'punk', gender: 'male', model: assets.malePunk({ assetFactory }) },
        { type: 'spacesuit', gender: 'male', model: assets.maleSpacesuit({ assetFactory }) },
        { type: 'suit', gender: 'male', model: assets.maleSuit({ assetFactory }) },
        { type: 'swat', gender: 'male', model: assets.maleSwat({ assetFactory }) },
        { type: 'worker', gender: 'male', model: assets.maleWorker({ assetFactory }) },
        // Female
        { type: 'adventurer', gender: 'female', model: assets.femaleAdventurer({ assetFactory }) },
        { type: 'casual', gender: 'female', model: assets.femaleCasual({ assetFactory }) },
        { type: 'formal', gender: 'female', model: assets.femaleFormal({ assetFactory }) },
        { type: 'medieval', gender: 'female', model: assets.femaleMedieval({ assetFactory }) },
        { type: 'punk', gender: 'female', model: assets.femalePunk({ assetFactory }) },
        { type: 'sciFi', gender: 'female', model: assets.femaleSciFi({ assetFactory }) },
        { type: 'soldier', gender: 'female', model: assets.femaleSoldier({ assetFactory }) },
        { type: 'suit', gender: 'female', model: assets.femaleSuit({ assetFactory }) },
        { type: 'witch', gender: 'female', model: assets.femaleWitch({ assetFactory }) },
        { type: 'worker', gender: 'female', model: assets.femaleWorker({ assetFactory }) },
    ];
    list.forEach(({ model }) => {
        model.position = new BABYLON.Vector3(target.x, 0, target.z);
        model.animationGroups.find((a) => a.name === 'Idle').play(true);
        model.setEnabled(false);
    });
    return list;
};

const cutscene = (props: { assetFactory: AssetFactory; target: BABYLON.Vector3; events: localEvents.Events }) => {
    const { assetFactory, target, events } = props;
    const george = assets.george({ assetFactory });
    george.position = new BABYLON.Vector3(target.x, target.y - 1, target.z + 5.5);
    const scale = 0.25;
    george.scaling = new BABYLON.Vector3(scale, scale, scale);
    george.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
    const walkAnimation = new BABYLON.Animation(
        'georgeWalk',
        'position.z',
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
    );
    walkAnimation.setKeys([
        { frame: 0, value: george.position.z },
        { frame: 60, value: target.z + 1.6 },
    ]);
    george.animations = [walkAnimation];

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
                assetFactory.scene.beginAnimation(george, 0, 60, false, 0.5, () => {
                    walk.stop();
                    idle.play(true);
                });
            }),
        )
        .subscribe();
};
