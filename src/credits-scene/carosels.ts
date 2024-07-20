import * as BABYLON from '@babylonjs/core';
import { tap, withLatestFrom } from 'rxjs';
import * as em from '../managers/entity-manager';
import * as models from '../shared/models';
import * as events from './events';
type GetItemProps = { scene: BABYLON.Scene; entityManager: em.EntityManager };
const getItems: (x: GetItemProps) => CaroselItem[] = (props: GetItemProps) => {
    const { scene, entityManager } = props;
    return [
        {
            name: 'fighter',
            model: new models.Model({
                name: 'fighter',
                scene,
                entityManager,
                asset: { file: 'fighter.glb', directory: 'assets/fighter/' },
            }),
            credits: 'TODO',
        },
    ];
};

type CaroselItem = { name: string; model: models.Model; credits: string };
export class Carosel {
    private readonly items: CaroselItem[];
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager; event: events.Events }) {
        const { scene, entityManager, event } = props;
        this.items = getItems({ scene, entityManager });
        if (this.items.length < 1) {
            throw new Error('Not enough items to render in carousel');
        }
        // this.items.forEach(this.hide);
        event.goTo$
            .pipe(
                withLatestFrom(event.current$),
                tap(([next, current]) => this.goTo({ from: current.index, to: next.index })),
                tap(([next]) => event.current$.next(next)),
            )
            .subscribe();
    }

    goTo = (props: { from: number; to: number }) => {
        const { from, to } = props;
        this.hide(this.items[from]);
        this.show(this.items[to]);
    };

    private show = (item: CaroselItem) => item.model.transform.getChildMeshes().forEach((m) => (m.visibility = 1));
    private hide = (item: CaroselItem) => item.model.transform.getChildMeshes().forEach((m) => (m.visibility = 0));
}
