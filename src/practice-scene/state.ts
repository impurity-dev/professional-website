import * as BABYLON from '@babylonjs/core';
import * as skyboxes from '../shared/skyboxes.js';
import { State } from '../shared/state.js';

export class PracticeState extends State {
    run = async (): Promise<void> => {
        const { scene } = this;
        const position = new BABYLON.Vector3(0, 0, 0);
        const camera = new BABYLON.FreeCamera('camera', position, scene);
        scene.activeCamera = camera;
        camera.attachControl();

        const obj = this.plane({ scene });
        obj.position = position.add(new BABYLON.Vector3(-20, 0, 0));
        obj.material = this.material({ scene });
        camera.target = obj.position;

        new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
        skyboxes.purpleSpace({ scene });
    };

    sphere = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 10, diameter: 10 }, scene);
        return sphere;
    };

    plane = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const plane: BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane('plane', { size: 10 }, scene);
        plane.rotate(new BABYLON.Vector3(0, 1, 0), (3 * Math.PI) / 2);
        return plane;
    };

    material = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        let time = 0;
        const material = new BABYLON.ShaderMaterial('portal', scene, 'portal', {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection', 'time', 'tex0'],
            samplers: ['tex0'],
        });
        const mainTexture = new BABYLON.Texture('./portraits/recruiter.png', scene);
        console.log(mainTexture.getSize());
        material.setVector2('resolution', new BABYLON.Vector2(800, 800));
        material.setTexture('tex0', mainTexture);
        scene.registerBeforeRender(() => {
            material.setFloat('time', time);
            time += 0.01;
        });
        return material;
    };
}
