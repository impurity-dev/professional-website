import * as BABYLON from '@babylonjs/core';
import { takeUntil, tap } from 'rxjs';
import * as sharedSounds from '../shared/sounds';
import * as events from './events';

export const sounds = (props: { scene: BABYLON.Scene; event: events.Events }) => {
    const { scene, event } = props;
    const hover = sharedSounds.buttonHover({ scene });
    const click = sharedSounds.buttonClick({ scene });
    event.buttonHover$
        .pipe(
            tap(() => hover.play()),
            takeUntil(event.destroy$),
        )
        .subscribe();
    event.buttonClick$
        .pipe(
            tap(() => click.play()),
            takeUntil(event.destroy$),
        )
        .subscribe();
};
