import { take, tap, withLatestFrom } from 'rxjs';
import * as models from '../shared/models';
import * as events from './events';

export type CaroselItem = { name: string; model: models.Model; credits: string; link: string };
export class Carosel {
    private readonly items: CaroselItem[];
    private readonly event: events.Events;
    constructor(props: { event: events.Events; items: CaroselItem[] }) {
        const { event, items } = props;
        this.event = event;
        this.items = items;
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
