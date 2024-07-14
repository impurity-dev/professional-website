import * as BABYLON from '@babylonjs/core';
import * as events from './events';

export class FPSController {
    public readonly camera: BABYLON.UniversalCamera;
    private readonly deviceManager: BABYLON.DeviceSourceManager;

    constructor(props: { scene: BABYLON.Scene; location: BABYLON.Vector3; target: BABYLON.Vector3; event: events.HubEvents }) {
        const { scene, location, target, event } = props;
        this.deviceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        this.camera = new BABYLON.UniversalCamera('fps-camera', location, scene);
        scene.activeCamera = this.camera;
        this.camera.target = target;
        this.camera.attachControl();
        this.camera.applyGravity = true;
        this.camera.checkCollisions = true;
        this.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        this.camera.minZ = 0.45;
        this.camera.speed = 0.5;
        this.camera.angularSensibility = 4000;
        this.camera.keysUp.push(87);
        this.camera.keysLeft.push(65);
        this.camera.keysDown.push(83);
        this.camera.keysRight.push(68);
        scene.activeCamera = this.camera;

        const framesPerSecond = 60;
        const gravity = -9.81;
        scene.gravity = new BABYLON.Vector3(0, gravity / framesPerSecond, 0);
        scene.collisionsEnabled = true;
        scene.onPointerDown = (event) => {
            const engine = scene.getEngine() as BABYLON.Engine;
            if (event.button === 0) engine.enterPointerlock();
            if (event.button === 1) engine.exitPointerlock();
        };

        this.addCrosshair({ scene, camera: this.camera });
        const box = BABYLON.MeshBuilder.CreateBox('camera-box', { size: 10 }, scene);
        box.parent = this.camera;

        scene.registerBeforeRender(() => {
            // this.castRay();
            this.handleControls({ event });
        });
    }

    handleControls = (props: { event: events.HubEvents }) => {
        const { deviceManager } = this;
        const { event } = props;
        const keyboard = deviceManager.getDeviceSource(BABYLON.DeviceType.Keyboard);
        if (!keyboard) {
            return;
        }
        const E = 69;
        if (keyboard.getInput(E) === 1) {
            event.onAction.notifyObservers({ type: 'launch' });
        }
    };

    flashlight = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const light = new BABYLON.SpotLight('spotLight', this.camera.position, this.camera.target, Math.PI / 2, 10, scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.intensity = 100;
        scene.onBeforeRenderObservable.add(() => {
            light.position = this.camera.position;
            light.setDirectionToTarget(this.camera.getFrontPosition(1));
        });
        return light;
    };

    castRay = (props: { scene: BABYLON.Scene; camera: BABYLON.Camera }) => {
        const { scene, camera } = props;
        const vecToLocal = (vector, mesh) => {
            const m = mesh.getWorldMatrix();
            const v = BABYLON.Vector3.TransformCoordinates(vector, m);
            return v;
        };
        const origin = camera.position;

        let forward = new BABYLON.Vector3(0, 0, 1);
        forward = vecToLocal(forward, camera);

        let direction = forward.subtract(origin);
        direction = BABYLON.Vector3.Normalize(direction);

        const length = 100;

        const ray = new BABYLON.Ray(origin, direction, length);

        const hit = scene.pickWithRay(ray);
        if (hit.pickedMesh && hit.pickedMesh?.metadata?.action === 'launch') {
            // console.log(hit);
        }
    };

    addCrosshair = (props: { scene: BABYLON.Scene; camera: BABYLON.Camera }) => {
        const { scene, camera } = props;
        const w = 128;

        const texture = new BABYLON.DynamicTexture('reticule', w, scene, false);
        texture.hasAlpha = true;

        const ctx = texture.getContext();

        const createOutline = () => {
            const c = 2;

            ctx.moveTo(c, w * 0.25);
            ctx.lineTo(c, c);
            ctx.lineTo(w * 0.25, c);

            ctx.moveTo(w * 0.75, c);
            ctx.lineTo(w - c, c);
            ctx.lineTo(w - c, w * 0.25);

            ctx.moveTo(w - c, w * 0.75);
            ctx.lineTo(w - c, w - c);
            ctx.lineTo(w * 0.75, w - c);

            ctx.moveTo(w * 0.25, w - c);
            ctx.lineTo(c, w - c);
            ctx.lineTo(c, w * 0.75);

            ctx.lineWidth = 1.5;
            ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
            ctx.stroke();
        };

        const createNavigate = () => {
            ctx.fillStyle = 'transparent';
            ctx.clearRect(0, 0, w, w);
            createOutline();

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 3.5;
            ctx.moveTo(w * 0.5, w * 0.25);
            ctx.lineTo(w * 0.5, w * 0.75);

            ctx.moveTo(w * 0.25, w * 0.5);
            ctx.lineTo(w * 0.75, w * 0.5);
            ctx.stroke();
            ctx.beginPath();

            texture.update();
        };

        createNavigate();

        const material = new BABYLON.StandardMaterial('reticule', scene);
        material.diffuseTexture = texture;
        material.opacityTexture = texture;
        material.emissiveColor.set(1, 1, 1);
        material.disableLighting = true;

        const plane = BABYLON.MeshBuilder.CreatePlane('reticule', { size: 0.04 }, new BABYLON.UtilityLayerRenderer(scene).utilityLayerScene);
        plane.material = material;
        plane.position.set(0, 0, 1.1);
        plane.isPickable = false;
        plane.rotation.z = Math.PI / 4;

        const reticule = plane;
        reticule.parent = camera;
        return reticule;
    };
}
