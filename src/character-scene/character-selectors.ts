import * as BABYLON from '@babylonjs/core';
import { take, takeUntil, tap } from 'rxjs';
import * as sharedModels from '../models';
import { EntityManager } from '../models/entity-manager';
import { Model } from '../models/models';
import * as localEvents from './events';
type CharacterLookup = {
    male: {
        adventurer: Model;
        beach: Model;
        casual: Model;
        farmer: Model;
        hoodie: Model;
        king: Model;
        punk: Model;
        spacesuit: Model;
        suit: Model;
        swat: Model;
        worker: Model;
    };
    female: {
        adventurer: Model;
        casual: Model;
        formal: Model;
        medieval: Model;
        punk: Model;
        sciFi: Model;
        soldier: Model;
        suit: Model;
        witch: Model;
        worker: Model;
    };
};
export class CharacterSelector {
    private currentCharacter: Model;
    private readonly lookup: CharacterLookup;
    constructor(props: { scene: BABYLON.Scene; entityManager: EntityManager; events: localEvents.Events; location: BABYLON.Vector3 }) {
        const { scene, entityManager, events, location } = props;
        this.lookup = {
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
        Object.entries(this.lookup).forEach(([key, chunk]) => {
            Object.entries(chunk).forEach(([_, model]) => {
                model.transform.position = new BABYLON.Vector3(location.x, 0, location.z);
                model.onLoad
                    .pipe(
                        take(1),
                        tap(() => model.animationGroups.find((a) => a.name === 'Idle').play(true)),
                        tap(() => model.transform.setEnabled(false)),
                    )
                    .subscribe();
            });
        });
        events.start$
            .pipe(
                take(1),
                tap(() => {
                    events.character$
                        .pipe(
                            tap((event) => this.changeCharacter(event)),
                            takeUntil(events.destroy$),
                        )
                        .subscribe();
                }),
            )
            .subscribe();
    }

    private changeCharacter = (event: localEvents.CharactersEvent) => {
        this.currentCharacter?.transform.setEnabled(false);
        this.currentCharacter = this.lookup[event.gender][event.type];
        this.currentCharacter.transform.setEnabled(true);
    };
}
