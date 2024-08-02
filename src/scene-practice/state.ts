import * as BABYLON from '@babylonjs/core';
import * as skyboxes from '../shared/skyboxes.js';
import { State } from '../managers/states.js';
import * as sharedModels from '../models';

export class PracticeState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const position = new BABYLON.Vector3(0, 0, 0);
        const camera = new BABYLON.FreeCamera('camera', position, scene);
        scene.activeCamera = camera;
        camera.attachControl();

        // const size = 10;
        // const obj = this.plane({ scene, size });
        // obj.position = position.add(new BABYLON.Vector3(-20, 0, 0));
        // obj.material = this.material({ scene });
        // camera.target = obj.position;
        // const portal = this.frame({ scene });
        // portal.translate(new BABYLON.Vector3(1, 0, 0), -1);

        const light = sharedModels.light14({ scene, entityManager });
        const load = entityManager.load();
        await load;
        light.transform.position = new BABYLON.Vector3(-2, 0, 0);
        light.transform.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
        light.color = new BABYLON.Color3(1, 0, 0);
        camera.target = light.transform.position;

        skyboxes.purpleSpace({ scene });

        let toggle = false;
        setInterval(() => {
            light.toggle = toggle;
            toggle = !toggle;
        }, 1_000);
        new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    };

    skybox = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const id = 'skybox';
        const file = 'skyboxes/purple/purple';
        const skybox = BABYLON.MeshBuilder.CreateBox(`${id}-mesh`, { size: 10000 }, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial(`${id}-material`, scene);
        const texture = new BABYLON.CubeTexture(
            file,
            scene,
            undefined,
            undefined,
            undefined,
            () => {
                console.log('HERE');
            },
            (msg, err) => {
                console.log(msg);
            },
        );
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = texture;
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skybox.material = skyboxMaterial;
        skybox.metadata = 'skybox';
        return skybox;
    };

    sphere = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 10, diameter: 10 }, scene);
        return sphere;
    };

    plane = (props: { scene: BABYLON.Scene; size: number }) => {
        const { scene, size } = props;
        const plane: BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane('plane', { size }, scene);
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
        material.setFloat('duration', 8.0);
        material.setTexture('tex0', mainTexture);
        scene.registerBeforeRender(() => {
            material.setFloat('time', time);
            time += 0.01;
        });
        return material;
    };

    frame = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const parent = new BABYLON.TransformNode('portal', scene);
        parent.position = new BABYLON.Vector3(-10, 0, 0);
        const gl = new BABYLON.GlowLayer('glow', scene, {
            mainTextureSamples: 4,
            mainTextureFixedSize: 256,
            blurKernelSize: 100,
        });
        const right = BABYLON.MeshBuilder.CreateBox('right', { height: 1, width: 0.1, depth: 0.1 }, scene);
        const top = BABYLON.MeshBuilder.CreateBox('top', { height: 1, width: 0.1, depth: 0.1 }, scene);
        const left = BABYLON.MeshBuilder.CreateBox('left', { height: 1, width: 0.1, depth: 0.1 }, scene);
        right.translate(new BABYLON.Vector3(0, 0, 1), 0.45);
        top.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
        top.translate(new BABYLON.Vector3(0, 0, 1), 0.45);
        left.translate(new BABYLON.Vector3(0, 0, 1), -0.45);
        gl.addIncludedOnlyMesh(right);
        gl.addIncludedOnlyMesh(top);
        gl.addIncludedOnlyMesh(left);
        const neonMaterial = new BABYLON.StandardMaterial('neonMaterial', scene);
        neonMaterial.emissiveColor = new BABYLON.Color3(0.35, 0.96, 0.88);
        right.material = neonMaterial;
        right.parent = parent;
        top.material = neonMaterial;
        top.parent = parent;
        left.material = neonMaterial;
        left.parent = parent;

        const plane: BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane('plane', { size: 1 }, scene);
        plane.parent = parent;
        plane.rotate(new BABYLON.Vector3(0, 1, 0), (3 * Math.PI) / 2);
        plane.material = this.material({ scene });
        return parent;
    };
}
