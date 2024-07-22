import * as BABYLON from '@babylonjs/core';
import { tap } from 'rxjs';
import * as models from '../models';
import * as em from '../models/entity-manager.js';
import { World } from '../shared/world.js';

export class CharacterWorld extends World {
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) {
        const { scene, entityManager } = props;
        super(scene, entityManager);
        this.lights({ scene });
        this.characters({ scene, entityManager });
    }

    private lights = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), scene);
        light.intensity = 0.1;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };

    private characters = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
        const { scene, entityManager } = props;
        models.station.station({ scene, entityManager });
        const m = models.femaleCharaters.adventurer({ scene, entityManager });
        m.onLoad
            .pipe(
                tap(() => {
                    m.animationGroups.find((n) => n.name === 'Idle').play(true);
                }),
            )
            .subscribe();
    };
}
