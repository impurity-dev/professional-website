import * as BABYLON from '@babylonjs/core';
import * as models from './';

const femaleDirectory = 'assets/female-characters/';
const maleDirectory = 'assets/male-characters/';

export type CharacterType =
    | {
          gender: 'male';
          type: 'adventurer' | 'beach' | 'casual' | 'hoodie' | 'farmer' | 'king' | 'punk' | 'spacesuit' | 'suit' | 'swat' | 'worker';
      }
    | {
          gender: 'female';
          type: 'adventurer' | 'casual' | 'formal' | 'medieval' | 'punk' | 'sciFi' | 'soldier' | 'suit' | 'witch' | 'worker';
      };

export class Character {
    private readonly model: models.Model;

    constructor(props: { scene: BABYLON.Scene; entityManager: models.EntityManager; type: CharacterType }) {
        const { scene, entityManager, type } = props;
        this.model = characterFactory({ type, scene, entityManager });
    }

    get transform() {
        return this.model.transform;
    }

    get animationGroups() {
        return this.model.animationGroups;
    }

    runAnimation = () => {
        return this.animationGroups.find((a) => a.name === 'Run');
    };

    idleAnimation = () => {
        return this.animationGroups.find((a) => a.name === 'Idle');
    };
}

export const characterLookup = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return {
        male: {
            adventurer: maleAdventurer({ scene, entityManager }),
            beach: maleBeach({ scene, entityManager }),
            casual: maleCasual({ scene, entityManager }),
            farmer: maleFarmer({ scene, entityManager }),
            hoodie: maleHoodie({ scene, entityManager }),
            king: maleKing({ scene, entityManager }),
            punk: malePunk({ scene, entityManager }),
            spacesuit: maleSpacesuit({ scene, entityManager }),
            suit: maleSuit({ scene, entityManager }),
            swat: maleSwat({ scene, entityManager }),
            worker: maleWorker({ scene, entityManager }),
        },
        female: {
            adventurer: femaleAdventurer({ scene, entityManager }),
            casual: femaleCasual({ scene, entityManager }),
            formal: femaleFormal({ scene, entityManager }),
            medieval: femaleMedieval({ scene, entityManager }),
            punk: femalePunk({ scene, entityManager }),
            sciFi: femaleSciFi({ scene, entityManager }),
            soldier: femaleSoldier({ scene, entityManager }),
            suit: femaleSuit({ scene, entityManager }),
            witch: femaleWitch({ scene, entityManager }),
            worker: femaleWorker({ scene, entityManager }),
        },
    };
};
export const characterFactory = (props: { type: CharacterType; scene: BABYLON.Scene; entityManager: models.EntityManager }): models.Model => {
    const { type, scene, entityManager } = props;
    if (type.gender === 'male') {
        if (type.type === 'adventurer') return maleAdventurer({ scene, entityManager });
        if (type.type === 'beach') return maleBeach({ scene, entityManager });
        if (type.type === 'casual') return maleCasual({ scene, entityManager });
        if (type.type === 'farmer') return maleFarmer({ scene, entityManager });
        if (type.type === 'hoodie') return maleHoodie({ scene, entityManager });
        if (type.type === 'king') return maleKing({ scene, entityManager });
        if (type.type === 'punk') return malePunk({ scene, entityManager });
        if (type.type === 'spacesuit') return maleSpacesuit({ scene, entityManager });
        if (type.type === 'suit') return maleSuit({ scene, entityManager });
        if (type.type === 'swat') return maleSwat({ scene, entityManager });
        if (type.type === 'worker') return maleWorker({ scene, entityManager });
        throw new Error('Invalid male type');
    } else if (type.gender === 'female') {
        if (type.type === 'adventurer') return femaleAdventurer({ scene, entityManager });
        if (type.type === 'casual') return femaleCasual({ scene, entityManager });
        if (type.type === 'formal') return femaleFormal({ scene, entityManager });
        if (type.type === 'medieval') return femaleMedieval({ scene, entityManager });
        if (type.type === 'sciFi') return femaleSciFi({ scene, entityManager });
        if (type.type === 'punk') return femalePunk({ scene, entityManager });
        if (type.type === 'soldier') return femaleSoldier({ scene, entityManager });
        if (type.type === 'suit') return femaleSuit({ scene, entityManager });
        if (type.type === 'witch') return femaleWitch({ scene, entityManager });
        if (type.type === 'worker') return femaleWorker({ scene, entityManager });
        throw new Error('Invalid female type');
    }
    throw new Error('Invalid gender type');
};

export const femaleAdventurer = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-adventurer',
        scene,
        entityManager,
        asset: { file: 'Adventurer.gltf', directory: femaleDirectory },
    });
};

export const femaleCasual = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-casual',
        scene,
        entityManager,
        asset: { file: 'Casual.gltf', directory: femaleDirectory },
    });
};

export const femaleFormal = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-formal',
        scene,
        entityManager,
        asset: { file: 'Formal.gltf', directory: femaleDirectory },
    });
};

export const femaleMedieval = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-medieval',
        scene,
        entityManager,
        asset: { file: 'Medieval.gltf', directory: femaleDirectory },
    });
};

export const femalePunk = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-punk',
        scene,
        entityManager,
        asset: { file: 'Punk.gltf', directory: femaleDirectory },
    });
};

export const femaleSciFi = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-scifi',
        scene,
        entityManager,
        asset: { file: 'SciFi.gltf', directory: femaleDirectory },
    });
};

export const femaleSoldier = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-soldier',
        scene,
        entityManager,
        asset: { file: 'Soldier.gltf', directory: femaleDirectory },
    });
};

export const femaleSuit = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-suit',
        scene,
        entityManager,
        asset: { file: 'Suit.gltf', directory: femaleDirectory },
    });
};

export const femaleWitch = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-witch',
        scene,
        entityManager,
        asset: { file: 'Witch.gltf', directory: femaleDirectory },
    });
};

export const femaleWorker = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-worker',
        scene,
        entityManager,
        asset: { file: 'Worker.gltf', directory: femaleDirectory },
    });
};

export const maleAdventurer = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-male-adventurer',
        scene,
        entityManager,
        asset: { file: 'Adventurer.gltf', directory: maleDirectory },
    });
};

export const maleBeach = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-beach',
        scene,
        entityManager,
        asset: { file: 'Beach.gltf', directory: maleDirectory },
    });
};

export const maleCasual = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-casual',
        scene,
        entityManager,
        asset: { file: 'Casual_2.gltf', directory: maleDirectory },
    });
};

export const maleHoodie = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-casual-hoodie',
        scene,
        entityManager,
        asset: { file: 'Casual_Hoodie.gltf', directory: maleDirectory },
    });
};

export const maleFarmer = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-farmer',
        scene,
        entityManager,
        asset: { file: 'Farmer.gltf', directory: maleDirectory },
    });
};

export const maleKing = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-king',
        scene,
        entityManager,
        asset: { file: 'King.gltf', directory: maleDirectory },
    });
};

export const malePunk = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-punk',
        scene,
        entityManager,
        asset: { file: 'Punk.gltf', directory: maleDirectory },
    });
};

export const maleSpacesuit = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-spacesuit',
        scene,
        entityManager,
        asset: { file: 'Spacesuit.gltf', directory: maleDirectory },
    });
};

export const maleSuit = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-suit',
        scene,
        entityManager,
        asset: { file: 'Suit.gltf', directory: maleDirectory },
    });
};

export const maleSwat = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-swat',
        scene,
        entityManager,
        asset: { file: 'Swat.gltf', directory: maleDirectory },
    });
};

export const maleWorker = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-worker',
        scene,
        entityManager,
        asset: { file: 'Worker.gltf', directory: maleDirectory },
    });
};
