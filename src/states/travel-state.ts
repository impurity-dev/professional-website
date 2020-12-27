import { Color4, FollowCamera, HemisphericLight, Scene, Vector3, TransformNode } from '@babylonjs/core';
import ShipTravelOscillationAnimation from '../animations/ship-travel-oscillation-animation';
import ShipTravelRotationAnimation from '../animations/ship-travel-rotation-animation';
import SpaceShipEntity from '../entities/spaceship-entity';
import TravelGui from '../guis/travel-gui';
import WarpSpeedParticles from '../particles/warpspeed-particles';
import PlanetParticles from '../particles/planet-particles';
import SpaceSkybox from '../skyboxes/space-skybox';
import OrbitState from './orbit-state';
import StartState from './start-state';
import State from './state';

export default class TravelState extends State {
    private spaceship: SpaceShipEntity;
    private camera: FollowCamera;

    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.spaceship = new SpaceShipEntity(this.scene);
        this.spaceship.position = Vector3.Zero();
        this.camera = new FollowCamera('FollowCamera', this.spaceship.position.add(new Vector3(0, 25, -100)), this.scene);
        this.camera.setTarget(this.spaceship.position.add(new Vector3(0, 0, 250)));
        this.scene.activeCamera = this.camera;

        const planets: PlanetParticles = new PlanetParticles(this.scene);
        planets.emitter = this.spaceship.position.add(new Vector3(100, 50, 2_000));
        planets.speed = 4;
        planets.recycleDepth = -2_100;
        planets.start();

        const planets1: PlanetParticles = new PlanetParticles(this.scene);
        planets1.emitter = this.spaceship.position.add(new Vector3(-100, 50, 100));
        planets1.speed = 10;
        planets1.recycleDepth = -200;
        planets1.start();

        const warpspeed: WarpSpeedParticles = new WarpSpeedParticles(this.scene, 50, 50);
        const warpspeedAnchor = new TransformNode('Warpspeed Emitter Anchor');
        warpspeedAnchor.position = this.spaceship.position.add(new Vector3(0, 25, 500));
        warpspeedAnchor.rotation.x = Math.PI / 2 + Math.PI;
        warpspeed.emitter = warpspeedAnchor as any;
        warpspeed.start();

        const frameRate = 64;
        this.spaceship.animations.push(new ShipTravelOscillationAnimation(frameRate));
        this.spaceship.animations.push(new ShipTravelRotationAnimation(frameRate));
        this.scene.beginAnimation(this.spaceship, 0, frameRate, true, 0.8);

        new TravelGui(
            this.scene,
            this.spaceship,
            () => {
                this.goToOrbit();
            },
            () => {
                warpspeed.toggleWarp();
            },
            () => {
                this.goToStart();
            },
        );

        new HemisphericLight('LightSource', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
    }

    async goToStart(): Promise<void> {
        await this.gameManager.setState(new StartState(this.gameManager));
        this.dispose();
    }

    async goToOrbit(): Promise<void> {
        await this.gameManager.setState(new OrbitState(this.gameManager));
        this.dispose();
    }
}
