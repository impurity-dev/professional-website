import * as BABYLON from '@babylonjs/core';
import { takeUntil, tap } from 'rxjs';
import * as sharedSounds from '../shared/sounds';
import * as events from './events';

export const sounds = (props: { scene: BABYLON.Scene; events: events.Events }) => {
    const { scene, events } = props;
    const hover = sharedSounds.buttonHover({ scene });
    const click = sharedSounds.buttonClick({ scene });
    events.buttonHover$
        .pipe(
            tap(() => hover.play()),
            takeUntil(events.destroy$),
        )
        .subscribe();
    events.buttonClick$
        .pipe(
            tap(() => click.play()),
            takeUntil(events.destroy$),
        )
        .subscribe();
};
