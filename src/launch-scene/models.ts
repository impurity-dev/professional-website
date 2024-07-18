import * as BABYLON from '@babylonjs/core';
import * as models from '../shared/models.js';
import * as em from '../managers/entity-manager';

export const cockpit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new Cockpit({ scene, entityManager });
};

export const corridor = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    const cockpitModel = new models.Model({
        name: 'corridor',
        scene,
        entityManager,
        asset: { file: 'corridor_4k.glb', directory: 'assets/corridor/' },
    });
    cockpitModel.onLoad.subscribe(() => {
        cockpitModel.transform.getChildTransformNodes().forEach((t) => {
            if (t.name === 'Stars-Space_4') t.dispose();
        });
    });
    return cockpitModel;
};

export class Cockpit extends models.Model {
    private _monitors?: BABYLON.AbstractMesh;
    private _throttle?: BABYLON.AbstractMesh;
    private _steering?: BABYLON.AbstractMesh;

    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) {
        const { scene, entityManager } = props;
        super({ name: 'cockpit', scene, entityManager, asset: { file: 'cockpit_4k.glb', directory: 'assets/cockpit/' } });
        this.onLoad.subscribe(() => {
            this.transform.getChildMeshes().forEach((m) => {
                if (m.name === 'monitors_displ_0') this._monitors = m;
                if (m.name === 'throttle_center_0') this._throttle = m;
                if (m.name === 'steering_center_0') this._steering = m;
            });
        });
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

    flickerMonitorsAsync = () => {
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
        this.scene.beginAnimation(this.monitors, 0, 100, false, 1);
    };
}
