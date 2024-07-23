import * as BABYLON from '@babylonjs/core';
import { take, tap } from 'rxjs';
import * as em from './entity-manager';
import * as models from './models.js';

export const station = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    const station = new models.Model({
        name: 'cyberpunk-station',
        scene,
        entityManager,
        asset: { file: 'station_2k.glb', directory: 'assets/cyberpunk-station/' },
    });
    station.onLoad
        .pipe(
            take(1),
            tap(() =>
                station.transform
                    .getChildTransformNodes()
                    .find((t) => t.name === 'Plane')
                    .dispose(),
            ),
        )
        .subscribe();
    return station;
};
