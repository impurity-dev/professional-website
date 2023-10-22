import { AbstractMesh, AssetsManager, MeshAssetTask, Scene, TransformNode } from '@babylonjs/core';

export class RobotEntity extends TransformNode {
    constructor(readonly scene: Scene) {
        super('Robot');
        const assetsManager = new AssetsManager(this.scene);
        const task = assetsManager.addMeshTask('RobotTask', '', 'assets/robot-3/pack/', 'scene.gltf');
        task.onSuccess = this.onSuccess(this);
        task.onError = this.onError;
        assetsManager.load();
    }

    private onError = (task: MeshAssetTask, message: string, exception?: unknown) => {
        console.error(`Unable to load spaceship mesh: ${message} :: ${exception}`);
        throw new Error('Error loading spaceship assets');
    };

    private onSuccess =
        (parent: TransformNode) =>
        (task: MeshAssetTask): void => {
            const meshes: AbstractMesh[] = task.loadedMeshes;
            meshes.forEach((mesh) => (mesh.parent = parent));
        };
}
