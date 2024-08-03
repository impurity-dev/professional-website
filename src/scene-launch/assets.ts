import * as BABYLON from '@babylonjs/core';
import { AssetFactory, AssetNode, ContainerNodeAsset } from '../nodes/nodes';
import { Observable, Subject } from 'rxjs';

export const cockpit = (props: { assetFactory: AssetFactory }) => new Cockpit(props);
export const COCKPIT_ASSET: ContainerNodeAsset = { type: 'container', file: 'cockpit_1k.glb', directory: 'assets/cockpit/' };
export class Cockpit extends BABYLON.TransformNode {
    readonly monitors: BABYLON.AbstractMesh;
    readonly throttle: BABYLON.AbstractMesh;
    readonly steering: BABYLON.AbstractMesh;
    readonly lights: BABYLON.PointLight;
    private readonly cockpit: AssetNode;
    private readonly assetFactory: AssetFactory;

    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super('cockpit', assetFactory.scene, true);
        this.assetFactory = assetFactory;
        this.cockpit = assetFactory.getContainer(COCKPIT_ASSET);
        this.cockpit.parent = this;
        const children = this.cockpit.getChildMeshes();
        this.lights = new BABYLON.PointLight('lights', new BABYLON.Vector3(0, 1, 0), assetFactory.scene);
        this.lights.parent = this;
        this.lights.specular = new BABYLON.Color3(0, 1, 0);
        this.lights.diffuse = new BABYLON.Color3(0, 1, 0);
        this.lights.intensity = 0;
        this.lights.includedOnlyMeshes = children;
        this.monitors = children.find((m) => m.name === 'monitors_displ_0');
        this.throttle = children.find((m) => m.name === 'throttle_center_0');
        this.throttle.rotationQuaternion = null;
        this.steering = children.find((m) => m.name === 'steering_center_0');
        this.steering.rotationQuaternion = null;
        this.lights = new BABYLON.PointLight('lights', new BABYLON.Vector3(0, 1, 0), assetFactory.scene);
        this.lights.parent = this;
        this.lights.specular = new BABYLON.Color3(0, 1, 0);
        this.lights.diffuse = new BABYLON.Color3(0, 1, 0);
        this.lights.intensity = 0;
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
                value: this.position,
            },
            {
                frame: 10,
                value: this.position.add(new BABYLON.Vector3(0, 0, 100)),
            },
            {
                frame: 60,
                value: this.position.add(end),
            },
        ]);
        this.animations = [animation];
        const finished$ = new Subject<void>();
        this.assetFactory.scene.beginAnimation(this, 0, 60, false, 0.5, () => {
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
        this.assetFactory.scene.beginAnimation(this.lights, 0, 100, false, 1, () => {
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
        this.assetFactory.scene.beginAnimation(this.monitors, 0, 100, false, 1, () => {
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
        this.assetFactory.scene.beginAnimation(this.throttle, 0, 60, false, 0.5, () => {
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
        this.assetFactory.scene.beginAnimation(this.steering, 0, 60, false, 0.5, () => {
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
            { frame: 0, value: this.cockpit.position.y },
            { frame: 60, value: this.cockpit.position.y - 2 },
        ];
        const ease = new BABYLON.QuadraticEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        animation.setEasingFunction(ease);
        animation.setKeys(keys);
        this.animations = [animation];
        const finished$ = new Subject<void>();
        this.assetFactory.scene.beginAnimation(this, 0, 60, false, 1, () => {
            finished$.next();
            finished$.complete();
        });
        return finished$;
    };
}

export const skyCorridor = (props: { assetFactory: AssetFactory }) => new SkyCorridor(props);
export const SKYCORRIDOR_ASSET: ContainerNodeAsset = {
    type: 'container',
    file: 'sky_corridor_1k.glb',
    directory: 'assets/sky-corridor/',
    meshes: ['Sketchfab_model', 'ox2.obj.cleaner.gles', 'Object_2', '__root__', 'Object_11', 'Object_22', 'Object_24', 'Object_25', 'Object_8'],
};
export class SkyCorridor extends BABYLON.TransformNode {
    private readonly corridor: AssetNode;
    private readonly light: Light14;

    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super(`sky-corridor`, assetFactory.scene, true);
        this.corridor = assetFactory.getContainer(SKYCORRIDOR_ASSET);
        this.corridor.parent = this;

        this.light = light14({ assetFactory });
        this.light.parent = this;
        this.light.position = new BABYLON.Vector3(-2.1, -0.1, -0.2);
        this.light.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
        this.light.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
        this.light.rotate(new BABYLON.Vector3(0, 0, 1), Math.PI);
        this.light.toggle = true;
        this.light.color = new BABYLON.Color3(0, 0, 1);
        this.light.includeMeshes = this.getChildMeshes();
    }
}

export const light14 = (props: { assetFactory: AssetFactory }) => new Light14(props);
export const LIGHT14_ASSET: ContainerNodeAsset = { type: 'container', file: 'scifi_light_14.glb', directory: 'assets/lights/' };
export class Light14 extends BABYLON.TransformNode {
    private readonly light: AssetNode;
    private readonly pointLight: BABYLON.PointLight;
    private readonly lightMesh: BABYLON.AbstractMesh;
    private readonly lightMaterial: BABYLON.PBRMaterial;

    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super('light14', assetFactory.scene, true);

        this.light = assetFactory.getContainer(LIGHT14_ASSET);
        this.light.parent = this;
        this.lightMesh = this.light.getChildMeshes().find((m) => m.name === 'Light_14_Material #38_0');
        this.lightMaterial = this.lightMesh.material as BABYLON.PBRMaterial;

        this.pointLight = new BABYLON.PointLight('light14-pl', new BABYLON.Vector3(0, 0, 0), assetFactory.scene);
        this.pointLight.parent = this;
        this.pointLight.position = new BABYLON.Vector3(0, -10, 25);
    }

    set color(color: BABYLON.Color3) {
        this.lightMaterial.emissiveColor = color;
        this.lightMaterial.albedoColor = color;
        this.lightMaterial.reflectionColor = color;
        this.pointLight.diffuse = color;
        this.pointLight.specular = color;
    }

    set toggle(isOn: boolean) {
        this.lightMesh.visibility = isOn ? 1 : 0;
        this.pointLight.intensity = isOn ? 1000 : 0;
    }

    set includeMeshes(meshes: BABYLON.AbstractMesh[]) {
        this.pointLight.includedOnlyMeshes = meshes;
    }
}
