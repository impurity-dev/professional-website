import * as BABYLON from '@babylonjs/core';
import * as em from '../models/entity-manager';
import * as models from '../models';
import { Observable, Subject, take, tap } from 'rxjs';

export const cockpit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new Cockpit({ scene, entityManager });
};

export class Cockpit extends models.Model {
    private _monitors?: BABYLON.AbstractMesh;
    private _throttle?: BABYLON.AbstractMesh;
    private _steering?: BABYLON.AbstractMesh;
    private lights: BABYLON.PointLight;

    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) {
        const { scene, entityManager } = props;
        super({ name: 'cockpit', scene, entityManager, asset: { file: 'cockpit_4k.glb', directory: 'assets/cockpit/' } });
        this.onLoad.subscribe(() => {
            const children = this.transform.getChildMeshes();
            this.lights.includedOnlyMeshes = children;
            children.forEach((m) => {
                if (m.name === 'monitors_displ_0') this._monitors = m;
                if (m.name === 'throttle_center_0') {
                    this._throttle = m;
                    this._throttle.rotationQuaternion = null;
                }
                if (m.name === 'steering_center_0') {
                    this._steering = m;
                    this._steering.rotationQuaternion = null;
                }
            });
        });
        this.lights = new BABYLON.PointLight('lights', new BABYLON.Vector3(0, 1, 0), scene);
        this.lights.parent = this.transform;
        this.lights.specular = new BABYLON.Color3(0, 1, 0);
        this.lights.diffuse = new BABYLON.Color3(0, 1, 0);
        this.lights.intensity = 0;
    }

    get monitors(): BABYLON.AbstractMesh {
        if (!this.isLoaded) throw new Error('Accessing monitors before loading');
        return this._monitors;
    }

    get throttle(): BABYLON.AbstractMesh {
        if (!this.isLoaded) throw new Error('Accessing throttle before loading');
        return this._throttle;
    }

    get steering(): BABYLON.AbstractMesh {
        if (!this.isLoaded) throw new Error('Accessing steering before loading');
        return this._steering;
    }

    launch$ = (end: BABYLON.Vector3) => {
        const animation = new BABYLON.Animation(
            'engineStart',
            'position',
            60,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
            true,
        );
        const ease = new BABYLON.ExponentialEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        animation.setEasingFunction(ease);
        animation.setKeys([
            {
                frame: 0,
                value: this.transform.position,
            },
            {
                frame: 60,
                value: new BABYLON.Vector3().add(this.transform.position).add(end),
            },
        ]);
        this.transform.animations = [animation];
        const finished$ = new Subject<void>();
        this.scene.beginAnimation(this.transform, 0, 60, false, 1, () => {
            finished$.next();
            finished$.complete();
        });
        return finished$;
    };

    flickerLights$ = (): Observable<void> => {
        const animation = new BABYLON.Animation(
            'flicker',
            'intensity',
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        );
        const keys = [
            { frame: 0, value: 0 },
            { frame: 10, value: 0.2 },
            { frame: 20, value: 0 },
            { frame: 30, value: 0.5 },
            { frame: 40, value: 0 },
            { frame: 50, value: 0.25 },
            { frame: 60, value: 0 },
            { frame: 100, value: 10 },
        ];
        animation.setKeys(keys);
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        animation.setEasingFunction(ease);
        this.lights.animations = [animation];
        const finished$ = new Subject<void>();
        this.scene.beginAnimation(this.lights, 0, 100, false, 1, () => {
            finished$.next();
            finished$.complete();
        });
        return finished$;
    };

    flickerMonitors$ = (): Observable<void> => {
        const animation = new BABYLON.Animation(
            'flicker',
            'visibility',
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        );
        const keys = [
            { frame: 0, value: 0 },
            { frame: 10, value: 0.2 },
            { frame: 20, value: 0 },
            { frame: 30, value: 0.5 },
            { frame: 40, value: 0 },
            { frame: 50, value: 0.25 },
            { frame: 60, value: 0 },
            { frame: 100, value: 1 },
        ];
        animation.setKeys(keys);
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        animation.setEasingFunction(ease);
        this.monitors.animations = [animation];
        const finished$ = new Subject<void>();
        this.scene.beginAnimation(this.monitors, 0, 100, false, 1, () => {
            finished$.next();
            finished$.complete();
        });
        return finished$;
    };

    /**
     * Change the throttle location. -45 brings it back, 0 puts it in
     * neutral, and 45 pushes it forward.
     * @param radians - radians to control where the throttle is.
     */
    changeThrottle$ = (radians: number): Observable<void> => {
        const animation = new BABYLON.Animation(
            'throttle',
            'rotation.x',
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        );
        const keys = [
            { frame: 0, value: this.throttle.rotation.x },
            { frame: 60, value: radians },
        ];
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        animation.setEasingFunction(ease);
        animation.setKeys(keys);
        this.throttle.animations = [animation];
        const finished$ = new Subject<void>();
        this.scene.beginAnimation(this.throttle, 0, 60, false, 0.5, () => {
            finished$.next();
            finished$.complete();
        });
        return finished$;
    };

    /**
     * Change the throttle location. -45 brings it back, 0 puts it in
     * neutral, and 45 pushes it forward.
     * @param radians - radians to control where the throttle is.
     */
    changeSteering$ = (radians: number): Observable<void> => {
        const animation = new BABYLON.Animation(
            'steering',
            'rotation.x',
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        );
        const keys = [
            { frame: 0, value: this.steering.rotation.x },
            { frame: 60, value: radians },
        ];
        const ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        animation.setEasingFunction(ease);
        animation.setKeys(keys);
        this.steering.animations = [animation];
        const finished$ = new Subject<void>();
        this.scene.beginAnimation(this.steering, 0, 60, false, 0.5, () => {
            finished$.next();
            finished$.complete();
        });
        return finished$;
    };

    engineStart$ = (): Observable<void> => {
        const animation = new BABYLON.Animation(
            'steering',
            'position.y',
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        );
        const keys = [
            { frame: 0, value: this.transform.position.y },
            { frame: 60, value: this.transform.position.y - 2 },
        ];
        const ease = new BABYLON.QuadraticEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        animation.setEasingFunction(ease);
        animation.setKeys(keys);
        this.transform.animations = [animation];
        const finished$ = new Subject<void>();
        this.scene.beginAnimation(this.transform, 0, 60, false, 1, () => {
            finished$.next();
            finished$.complete();
        });
        return finished$;
    };
}

export const skyCorridor = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new SkyCorridor({ scene, entityManager });
};

export class SkyCorridor extends models.Entity {
    private readonly corridor: models.Model;
    private readonly light: models.Light14;
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) {
        const { scene, entityManager } = props;
        super({ name: 'sky-corridor', scene });
        this.corridor = new models.Model({
            name: 'corridor',
            scene,
            entityManager,
            asset: { file: 'sky_corridor_1k.glb', directory: 'assets/sky-corridor/' },
        });
        this.corridor.transform.parent = this.transform;
        this.light = models.light14({ scene, entityManager });
        this.light.transform.parent = this.transform;
        this.light.transform.position = new BABYLON.Vector3(-2.1, -0.1, -0.2);
        this.light.transform.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
        this.light.transform.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
        this.light.transform.rotate(new BABYLON.Vector3(0, 0, 1), Math.PI);
        this.light.onLoad
            .pipe(
                take(1),
                tap(() => {
                    this.light.toggle = true;
                    this.light.color = new BABYLON.Color3(0, 0, 1);
                }),
            )
            .subscribe();
        const straightMeshes = ['__root__', 'Object_11', 'Object_22', 'Object_24', 'Object_25', 'Object_8'];
        this.corridor.onLoad
            .pipe(
                take(1),
                tap(() => {
                    const includeMeshes = [];
                    this.corridor.transform.getChildMeshes().forEach((m) => {
                        const isValid = straightMeshes.includes(m.name);
                        m.setEnabled(isValid);
                        if (isValid) includeMeshes.push(m);
                    });
                    this.light.includeMeshes = includeMeshes;
                }),
            )
            .subscribe();
    }
}
