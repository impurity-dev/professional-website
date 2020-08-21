import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
import { SphereBuilder } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Scene } from '@babylonjs/core/scene';
import React, { Component } from 'react';
import { SceneManager } from '../../services/SceneManager';
import createHologramMaterial from './HologramMaterial';

type Props = { id: string; className?: string };
type State = {};

class Playground extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.createScene = this.createScene.bind(this);
    }

    componentDidMount(): void {
        this.createScene();
    }

    render(): JSX.Element {
        const { id, className } = this.props;
        return <canvas id={id} className={className} />;
    }

    private createScene(): void {
        const { id } = this.props;
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        const engine = new Engine(canvas);

        const scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 0);
        SceneManager.attachInspector(scene);

        const camera = new FreeCamera('Camera', new Vector3(0, 0, -10), scene);
        camera.setTarget(Vector3.Zero());

        //----Custom----//
        const planet = SphereBuilder.CreateSphere('Planet', { segments: 20 }, scene);
        planet.material = createHologramMaterial(scene);
        planet.scaling = new Vector3(3, 3, 3);
        //--End Custom--//

        engine.runRenderLoop(() => this.runRenderLoop(scene));
        window.addEventListener('resize', () => this.resizeEventListener(engine));
    }

    private runRenderLoop(scene: Scene): void {
        scene.render();
    }

    private resizeEventListener(engine: Engine): void {
        engine.resize();
    }
}

export default Playground;
