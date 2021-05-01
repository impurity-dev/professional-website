import { Color4, FreeCamera, HemisphericLight, Scene, Space, Vector3, FollowCamera, Matrix, Color3 } from '@babylonjs/core';
import MapPlanetEntity from '../entities/map-planet-entity';
import MapRingEntity from '../entities/map-ring-entity';
import MapSunEntity from '../entities/map-sun-entity';
import MapGui from '../guis/map-gui';
import SpaceSkybox from '../skyboxes/space-skybox';
import State from './state';
import TravelState from './travel-state';

export default class MapState extends State {
    private camera: FollowCamera;

    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.camera = new FollowCamera('Camera', Vector3.Zero(), this.scene);
        this.scene.activeCamera = this.camera;

        const sun = new MapSunEntity(this.scene, 100);
        sun.position = this.camera.position.add(new Vector3(0, 100, 1_000));

        const rotation = new Vector3(-Math.PI / 8, 0, 0);

        const innerRadius = 200;
        const innerDisc = new MapRingEntity(this.scene, innerRadius, [new Vector3(0, 0, 0), new Vector3(0, 1, 0)]);
        innerDisc.position = sun.position.clone();
        innerDisc.rotation.addInPlace(rotation);

        const innerPlanet = new MapPlanetEntity(this.scene, 15, 100, new Color3(0, 1, 1));
        innerPlanet.position = new Vector3(0, 0, innerRadius);
        innerPlanet.parent = innerDisc;

        const middleRadius = 400;
        const middleDisc = new MapRingEntity(this.scene, middleRadius, [new Vector3(0, 0, 0), new Vector3(0, 1, 0)]);
        middleDisc.position = sun.position.clone();
        middleDisc.rotation.addInPlace(rotation);

        const middlePlanet = new MapPlanetEntity(this.scene, 5, 100, new Color3(1, 1, 0));
        middlePlanet.position = new Vector3(0, 0, middleRadius);
        middlePlanet.parent = middleDisc;

        const outerRadius = 600;
        const outerDisc = new MapRingEntity(this.scene, outerRadius, [new Vector3(0, 0, 0), new Vector3(0, 1, 0)]);
        outerDisc.position = sun.position.clone();
        outerDisc.rotation.addInPlace(rotation);

        const outerPlanet = new MapPlanetEntity(this.scene, 25, 100, new Color3(1, 0, 1));
        outerPlanet.position = new Vector3(0, 0, outerRadius);
        outerPlanet.parent = outerDisc;

        this.scene.registerAfterRender(() => {
            innerDisc.rotate(new Vector3(0, 1, 0), 0.004, Space.LOCAL);
            middleDisc.rotate(new Vector3(0, 1, 0), -0.005, Space.LOCAL);
            outerDisc.rotate(new Vector3(0, 1, 0), 0.005, Space.LOCAL);
        });

        const checkMouseSelection = () => {
            const ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, Matrix.Identity(), this.camera);
            const hit = this.scene.pickWithRay(ray);
            const pickedMesh = hit.pickedMesh;

            if (pickedMesh && pickedMesh.metadata != 'skybox' && pickedMesh.metadata == 'planet') {
                pickedMesh.scaling = new Vector3(2, 2, 2);
            }
        };

        this.scene.onPointerMove = () => {
            checkMouseSelection();
        };

        new MapGui(this.scene, () => {
            this.goToTravel();
        });

        new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
    }

    async goToTravel(): Promise<void> {
        this.gameManager.setState(new TravelState(this.gameManager));
    }
}
