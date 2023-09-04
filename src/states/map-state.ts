import { Color3, FollowCamera, Matrix, Space, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture } from '@babylonjs/gui';
import MapPlanetEntity from '../entities/map-planet-entity.js';
import MapRingEntity from '../entities/map-ring-entity.js';
import MapSunEntity from '../entities/map-sun-entity.js';
import createMapPlanetLabel from '../guis/components/map-planet-label.js';
import MapGui from '../guis/map-gui.js';
import SpaceSkybox from '../skyboxes/space-skybox.js';
import State from './state.js';

export default class MapState extends State {
    private camera: FollowCamera;

    run = async (): Promise<void> => {
        this.camera = new FollowCamera('Camera', Vector3.Zero(), this.scene);
        this.scene.activeCamera = this.camera;

        const sun = new MapSunEntity(this.scene, 100, 200, new Color3(0, 1, 1));
        sun.position = this.camera.position.add(new Vector3(0, 100, 1_000));

        const rotation = new Vector3(-Math.PI / 8, 0, 0);

        const innerRadius = 200;
        const innerDisc = new MapRingEntity(this.scene, innerRadius, [new Vector3(0, 0, 0), new Vector3(0, 1, 0)]);
        innerDisc.position = sun.position.clone();
        innerDisc.rotation.addInPlace(rotation);

        const innerPlanet = new MapPlanetEntity(this.scene, 15, 100, new Color3(1, 1, 0));
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

        const outerPlanet = new MapPlanetEntity(this.scene, 25, 100, new Color3(1, 1, 0));
        outerPlanet.position = new Vector3(0, 0, outerRadius);
        outerPlanet.parent = outerDisc;

        const gui = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        createMapPlanetLabel('Personal', innerPlanet.sphere, gui);
        createMapPlanetLabel('Projects', middlePlanet.sphere, gui);
        createMapPlanetLabel('Experience', outerPlanet.sphere, gui);

        const DISC_AXIS = new Vector3(0, 1, 0);
        let discSpeed = 0.06;
        const INTERVAL = 100;
        const discAnimationSpeedDecay = setInterval(() => {
            if (discSpeed > 0.002) {
                discSpeed -= 0.002;
            } else {
                clearInterval(discAnimationSpeedDecay);
            }
        }, INTERVAL);
        this.scene.registerAfterRender(() => {
            innerDisc.rotate(DISC_AXIS, discSpeed + 0.0005, Space.LOCAL);
            middleDisc.rotate(DISC_AXIS, -discSpeed + 0.0005, Space.LOCAL);
            outerDisc.rotate(DISC_AXIS, discSpeed, Space.LOCAL);
        });

        this.scene.onPointerDown = async () => {
            const ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, Matrix.Identity(), this.camera);
            const hit = this.scene.pickWithRay(ray);
            const pickedMesh = hit.pickedMesh;

            if (pickedMesh && pickedMesh.metadata != 'skybox' && pickedMesh.metadata?.type == 'map-planet') {
                pickedMesh.scaling = new Vector3(2, 2, 2);
                await this.gameManager.goTo({ type: 'travel' });
            }
        };

        new MapGui(this.scene, async () => await this.gameManager.goTo({ type: 'travel' }));

        // new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);
    };
}
