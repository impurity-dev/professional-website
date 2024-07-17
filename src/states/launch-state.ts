import { Animatable, ArcRotateCamera, HemisphericLight, Vector3 } from '@babylonjs/core';
import { CameraPrelaunchAnimation } from '../animations/camera-prelaunch-animation.js';
import { CameraRotationAnimation } from '../animations/camera-rotation-animation.js';
import { ShipLaunchAnimation } from '../animations/ship-launch-animation.js';
import { ShipRockingAnimation } from '../animations/ship-rocking-animation.js';
import { SpaceShipEntity } from '../entities/spaceship-entity.js';
import { StartGui } from '../guis/start-gui.js';
import { GasCloudParticles } from '../particles/gas-cloud-particles.js';
import * as skyboxes from '../shared/skyboxes.js';
import { State } from '../managers/states.js';

export class LaunchState extends State {
    private spaceship: SpaceShipEntity;
    private camera: ArcRotateCamera;
    private cameraAnimatable: Animatable;
    private shipAnimatable: Animatable;
    private isWarping: boolean = false;
    private gasClouds: GasCloudParticles;

    run = async (): Promise<void> => {
        const { scene } = this;
        this.spaceship = new SpaceShipEntity(scene);
        this.spaceship.position = Vector3.Zero();
        this.camera = new ArcRotateCamera('ArcRotateCamera', Math.PI / 2, Math.PI / 2.5, 100, this.spaceship.position, scene);
        this.camera.setTarget(this.spaceship.position);
        scene.activeCamera = this.camera;

        const cameraAnimation = new CameraRotationAnimation(10);
        const shipAnimation = new ShipRockingAnimation(10);
        this.camera.animations.push(cameraAnimation);
        this.spaceship.animations.push(shipAnimation);
        this.cameraAnimatable = scene.beginAnimation(this.camera, 0, 4 * cameraAnimation.frameRate, true, 0.5);
        this.shipAnimatable = scene.beginAnimation(this.spaceship, 0, 2 * shipAnimation.frameRate, true);

        new HemisphericLight('LightSource', new Vector3(1, 1, 0), scene);
        skyboxes.purpleSpace({ scene });

        this.gasClouds = new GasCloudParticles(scene, 200, new Vector3(0, 0, -1), new Vector3(0, 0, -1));
        this.gasClouds.emitter = this.spaceship.position.add(new Vector3(0, -25, 250));
        this.gasClouds.start();

        new StartGui(scene, {
            onLaunch: this.onLaunch,
        });
    };

    private onLaunch = () => {
        const { scene } = this;
        if (this.isWarping) return;

        this.isWarping = true;
        // Stop Passive animation
        this.cameraAnimatable.stop();
        this.shipAnimatable.stop();

        // Start Launch
        const cameraAnimation = new CameraPrelaunchAnimation(this.camera.alpha, 10);
        this.camera.animations.push(cameraAnimation);
        this.cameraAnimatable = scene.beginAnimation(this.camera, 0, cameraAnimation.frameRate, false, 1, () => {
            this.gasClouds.stop();

            const shipAnimation = new ShipLaunchAnimation(this.spaceship.position, 10);
            this.spaceship.animations.push(shipAnimation);
            scene.beginAnimation(this.spaceship, 0, shipAnimation.frameRate, false, 1, async () => await this.gameManager.goTo({ type: 'travel' }));
        });
    };
}
