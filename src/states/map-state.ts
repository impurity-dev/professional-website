import { Mesh, Color4, HemisphericLight, Scene, Vector3, MeshBuilder, FreeCamera } from '@babylonjs/core';
import MapGui from '../guis/map-gui';
import SpaceSkybox from '../skyboxes/space-skybox';
import State from './state';
import TravelState from './travel-state';

export default class MapState extends State {
    private camera: FreeCamera;

    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.camera = new FreeCamera('Camera', Vector3.Zero(), this.scene);
        this.scene.activeCamera = this.camera;
        this.camera.attachControl(this.gameManager.canvas, true);

        const sun = Mesh.CreateSphere('Sun', 10, 100, this.scene);
        sun.position = this.camera.position.add(new Vector3(0, 50, 1_000));

        const innerDisc = MeshBuilder.CreateTube(
            'tube',
            {
                path: [new Vector3(0, 0, 0), new Vector3(0, 0.5, 0)],
                radius: 200,
                sideOrientation: Mesh.DOUBLESIDE,
            },
            this.scene,
        );
        innerDisc.position = sun.position.subtract(new Vector3(0, 0, 0));
        innerDisc.rotation.addInPlace(new Vector3(-Math.PI / 8, 0, 0));

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
