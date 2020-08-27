import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
import { SphereBuilder } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Scene } from '@babylonjs/core/scene';
import React, { Component } from 'react';
import { SceneManager } from '../../services/SceneManager';
import createHologramMaterial from './HologramMaterial';
import { GUI3DManager } from '@babylonjs/gui/3D/gui3DManager';
import { SpherePanel } from '@babylonjs/gui/3D/controls/spherePanel';
import { TransformNode, Mesh } from '@babylonjs/core';
import { MeshButton3D } from '@babylonjs/gui/3D/controls/meshButton3D';
import SceneComponent from './SceneComponent';

type Props = { id: string; className?: string };
type State = {};

class Playground extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.onSceneReady = this.onSceneReady.bind(this);
    }

    render(): JSX.Element {
        const { id, className } = this.props;
        return <SceneComponent id={id} className={className} antialias onSceneReady={this.onSceneReady} />;
    }

    private onSceneReady(scene: Scene): void {
        scene.clearColor = new Color4(0, 0, 0, 0);
        SceneManager.attachInspector(scene);

        const camera = new FreeCamera('Camera', new Vector3(0, 0, -10), scene);
        camera.setTarget(Vector3.Zero());

        //----Custom----//
        const planet = SphereBuilder.CreateSphere('Planet', { segments: 20 }, scene);
        planet.material = createHologramMaterial(scene);
        planet.scaling = new Vector3(3, 3, 3);

        const gui3DManager = new GUI3DManager(scene);
        const spherePanel = new SpherePanel();
        spherePanel.name = 'Sphere Panel';
        spherePanel.margin = 1.14;
        gui3DManager.addControl(spherePanel);
        const sphereAnchor = new TransformNode('Sphere Panel Anchor');
        sphereAnchor.rotate(new Vector3(1, 0, 0), Math.PI / 2);
        sphereAnchor.position = new Vector3(0, 0, 5);
        spherePanel.linkToTransformNode(sphereAnchor);

        const holographicMaterial = createHologramMaterial(scene);
        spherePanel.blockLayout = true;
        for (let i = 0; i < 10; i++) {
            const mesh = Mesh.CreateIcoSphere('Sphere Button Mesh', { radius: 0.5, subdivisions: 1 }, scene);
            mesh.material = holographicMaterial;
            const button = new MeshButton3D(mesh, 'Sphere Button');
            button.onPointerClickObservable.add(() => alert('Todo: Hud Actions'));

            scene.onBeforeRenderObservable.add(() => {
                const rotation = (2 * Math.PI) / 60;
                mesh.rotation.y += rotation / 12;
                mesh.rotation.x += rotation / 24;
                mesh.rotation.z += rotation / 36;
            });

            spherePanel.addControl(button);
        }
        spherePanel.blockLayout = false;
        //--End Custom--//
    }
}

export default Playground;
