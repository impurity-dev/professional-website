import * as BABYLON from '@babylonjs/core';
import { take, takeUntil, tap } from 'rxjs';
import * as sharedModels from '../models';
import { EntityManager } from '../models/entity-manager';
import { Model } from '../models/models';
import * as localEvents from './events';

export class CharacterSelector {
    private currentCharacter: Model;
    private readonly lookup: sharedModels.CharacterLookup;
    constructor(props: { scene: BABYLON.Scene; entityManager: EntityManager; events: localEvents.Events; location: BABYLON.Vector3 }) {
        const { scene, entityManager, events, location } = props;
        this.lookup = sharedModels.characterLookup({ scene, entityManager });
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

    private changeCharacter = (event: sharedModels.CharacterType) => {
        this.currentCharacter?.transform.setEnabled(false);
        this.currentCharacter = this.lookup[event.gender][event.type];
        this.currentCharacter.transform.setEnabled(true);
    };
}
