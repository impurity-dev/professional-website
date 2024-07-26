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
        Object.entries(this.lookup).forEach(([, chunk]) => {
            Object.entries(chunk).forEach(([, model]) => {
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
