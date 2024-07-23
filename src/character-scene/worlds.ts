import * as BABYLON from '@babylonjs/core';
import * as sharedModels from '../models';
import * as em from '../models/entity-manager.js';
import { World } from '../shared/world.js';

export class CharacterWorld extends World {
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) {
        const { scene, entityManager } = props;
        super(scene, entityManager);
        this.lights({ scene });
        this.station({ scene, entityManager });
        this.characters({ scene, entityManager });
    }

    private lights = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), scene);
        light.intensity = 0.1;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };

    private station = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
        const { scene, entityManager } = props;
        return sharedModels.station.station({ scene, entityManager });
    };

    private characters = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
        const { scene, entityManager } = props;
        const characters = {
            male: {
                adventurer: sharedModels.maleCharaters.adventurer({ scene, entityManager }),
                beach: sharedModels.maleCharaters.beach({ scene, entityManager }),
                casual: sharedModels.maleCharaters.casual({ scene, entityManager }),
                farmer: sharedModels.maleCharaters.farmer({ scene, entityManager }),
                hoodie: sharedModels.maleCharaters.hoodie({ scene, entityManager }),
                king: sharedModels.maleCharaters.king({ scene, entityManager }),
                punk: sharedModels.maleCharaters.punk({ scene, entityManager }),
                spacesuit: sharedModels.maleCharaters.spacesuit({ scene, entityManager }),
                suit: sharedModels.maleCharaters.suit({ scene, entityManager }),
                swat: sharedModels.maleCharaters.swat({ scene, entityManager }),
                worker: sharedModels.maleCharaters.worker({ scene, entityManager }),
            },
            female: {
                adventurer: sharedModels.femaleCharaters.adventurer({ scene, entityManager }),
                casual: sharedModels.femaleCharaters.casual({ scene, entityManager }),
                formal: sharedModels.femaleCharaters.formal({ scene, entityManager }),
                medieval: sharedModels.femaleCharaters.medieval({ scene, entityManager }),
                punk: sharedModels.femaleCharaters.punk({ scene, entityManager }),
                sciFi: sharedModels.femaleCharaters.sciFi({ scene, entityManager }),
                soldier: sharedModels.femaleCharaters.soldier({ scene, entityManager }),
                suit: sharedModels.femaleCharaters.suit({ scene, entityManager }),
                witch: sharedModels.femaleCharaters.witch({ scene, entityManager }),
                worker: sharedModels.femaleCharaters.worker({ scene, entityManager }),
            },
        };
        return characters;
    };
}
