import { AbstractMesh, AssetsManager, MeshAssetTask, Scene, TransformNode } from '@babylonjs/core';
import { logger } from '../shared/logger';

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
        logger.error(`Unable to load robot mesh: ${message} :: ${exception}`);
        throw new Error('Error loading robot assets');
    };

    private onSuccess =
        (parent: TransformNode) =>
        (task: MeshAssetTask): void => {
            const meshes: AbstractMesh[] = task.loadedMeshes;
            meshes.forEach((mesh) => (mesh.parent = parent));
        };
}
