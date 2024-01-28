import { Scene, TransformNode } from '@babylonjs/core';

export abstract class Entity {
    public readonly transform: TransformNode;
    protected readonly name: string;
    protected readonly scene: Scene;

    constructor(props: { name: string; scene: Scene }) {
        const { name, scene } = props;
        this.name = name;
        this.scene = scene;
        this.transform = new TransformNode(name, scene);
    }
}
