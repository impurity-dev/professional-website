import { FollowCamera, HemisphericLight, TransformNode, Vector3 } from '@babylonjs/core';
import { ShipTravelOscillationAnimation } from '../animations/ship-travel-oscillation-animation.js';
import { ShipTravelRotationAnimation } from '../animations/ship-travel-rotation-animation.js';
import { SpaceShipEntity } from '../entities/spaceship-entity.js';
import { TravelGui } from '../guis/travel-gui.js';
import { PlanetSolidParticles } from '../solid-particles/planet-solid-particles.js';
import { WarpspeedCloudParticles } from '../particles/warpspeed-cloud-particles.js';
import { WarpspeedStarParticles } from '../particles/warpspeed-star-particles.js';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { State } from './state.js';
import { WarpspeedStarsSolidParticles } from '../solid-particles/warpspeed-stars-solid-particles.js';

export class TravelState extends State {
    private spaceship: SpaceShipEntity;
    private camera: FollowCamera;
    private isWarping: boolean = false;

    run = async (): Promise<void> => {
        this.spaceship = new SpaceShipEntity(this.scene);
        this.spaceship.position = Vector3.Zero();
        this.camera = new FollowCamera('FollowCamera', this.spaceship.position.add(new Vector3(0, 25, -100)), this.scene);
        this.camera.setTarget(this.spaceship.position.add(new Vector3(0, 0, 250)));
        this.scene.activeCamera = this.camera;

        const planets: PlanetSolidParticles = new PlanetSolidParticles(this.scene);
        planets.emitter = this.spaceship.position.add(new Vector3(100, 50, 2_000));
        planets.speed = 4;
        planets.recycleDepth = -2_100;
        planets.start();

        const planets1: PlanetSolidParticles = new PlanetSolidParticles(this.scene);
        planets1.emitter = this.spaceship.position.add(new Vector3(-100, 50, 5_000));
        planets1.speed = 10;
        planets1.recycleDepth = -5_100;
        planets1.start();

        const solidStars: WarpspeedStarsSolidParticles = new WarpspeedStarsSolidParticles(this.scene, 500, 75);
        solidStars.emitter = this.spaceship.position.add(new Vector3(0, 0, 500));
        solidStars.speed = 5;
        solidStars.recycleDepth = -600;

        const warpspeedAnchor = new TransformNode('Warpspeed Emitter Anchor');
        warpspeedAnchor.position = this.spaceship.position.add(new Vector3(0, 25, 500));
        warpspeedAnchor.rotation.x = Math.PI / 2 + Math.PI;

        const warpspeedStars: WarpspeedStarParticles = new WarpspeedStarParticles(this.scene, 50, 50);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        warpspeedStars.emitter = warpspeedAnchor as any;

        const warpspeedClouds: WarpspeedCloudParticles = new WarpspeedCloudParticles(this.scene, 50, 50);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        warpspeedClouds.emitter = warpspeedAnchor as any;

        const frameRate = 64;
        this.spaceship.animations.push(new ShipTravelOscillationAnimation(frameRate));
        this.spaceship.animations.push(new ShipTravelRotationAnimation(frameRate));
        this.scene.beginAnimation(this.spaceship, 0, frameRate, true, 0.8);

        new TravelGui(
            this.scene,
            this.spaceship,
            async () => await this.gameManager.goTo({ type: 'orbit' }),
            () => {
                this.isWarping = !this.isWarping;
                if (this.isWarping) {
                    solidStars.start();
                    warpspeedStars.start();
                    warpspeedClouds.start();
                }
            },
            async () => await this.gameManager.goTo({ type: 'launch' }),
        );

        new HemisphericLight('LightSource', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);
    };
}
