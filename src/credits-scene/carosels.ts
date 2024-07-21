import * as BABYLON from '@babylonjs/core';
import { take, tap, withLatestFrom } from 'rxjs';
import * as em from '../managers/entity-manager';
import * as models from '../shared/models';
import * as events from './events';
type GetItemProps = { scene: BABYLON.Scene; entityManager: em.EntityManager };
const getItems: (x: GetItemProps) => CaroselItem[] = (props: GetItemProps) => {
    const { scene, entityManager } = props;
    return [
        {
            name: 'fighter',
            link: 'https://sketchfab.com/3d-models/light-fighter-spaceship-free-51616ef53af84fe595c5603cd3e0f3e1',
            model: new models.Model({
                name: 'fighter',
                scene,
                entityManager,
                asset: { file: 'fighter.glb', directory: 'assets/fighter/' },
            }),
            credits:
                '"LIGHT FIGHTER SPACESHIP - FREE" by Kerem Kavalci. https://sketchfab.com/3d-models/light-fighter-spaceship-free-51616ef53af84fe595c5603cd3e0f3e1',
        },
        {
            name: 'chamber',
            link: 'https://skfb.ly/oODEM',
            model: (() => {
                const model = new models.Model({
                    name: 'chamber',
                    scene,
                    entityManager,
                    asset: { file: 'chamber_1k.glb', directory: 'assets/chamber/' },
                });
                model.transform.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
                model.transform.position = new BABYLON.Vector3(0, 0, -2.5);
                return model;
            })(),
            credits:
                '"Cloning Tank Chamber JFG - Roblox PBR Showcase" (https://skfb.ly/oODEM) by Jesus Fernandez Garcia is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
    ];
};

type CaroselItem = { name: string; model: models.Model; credits: string; link: string };
export class Carosel {
    private readonly items: CaroselItem[];
    private readonly event: events.Events;
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager; event: events.Events }) {
        const { scene, entityManager, event } = props;
        this.event = event;
        this.items = getItems({ scene, entityManager });
        if (this.items.length < 1) {
            throw new Error('Not enough items to render in carousel');
        }
        this.items.forEach(this.hide);
        event.current$
            .pipe(
                take(1),
                tap((current) => this.goTo({ from: 0, to: current.index })),
            )
            .subscribe();
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
        const fromItem = this.items[Math.abs(from) % this.items.length];
        const toItem = this.items[Math.abs(to) % this.items.length];
        this.hide(fromItem);
        this.show(toItem);
        this.event.credits$.next({ name: toItem.name, credits: toItem.credits, link: toItem.link });
    };

    private show = (item: CaroselItem) => item.model.transform.setEnabled(true);
    private hide = (item: CaroselItem) => item.model.transform.setEnabled(false);
}
