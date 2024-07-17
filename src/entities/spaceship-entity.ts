import { AbstractMesh, AssetsManager, Color3, MeshAssetTask, Node, Scene, StandardMaterial, TransformNode, Vector3 } from '@babylonjs/core';
import { EngineParticles } from '../particles/engine-particles.js';
import * as logger from '../shared/logger.js';

export class SpaceShipEntity extends TransformNode {
    private readonly scale: number = 0.1;

    constructor(
        private readonly scene: Scene,
        readonly enableEngineParticles: boolean = true,
    ) {
        super('Spaceship');
        this.scaling = new Vector3(this.scale, this.scale, this.scale);
        this.setupMesh();
        if (enableEngineParticles) {
            const engineParticles: EngineParticles = new EngineParticles(this.scene);
            engineParticles.fountain.parent = this;
            engineParticles.fountain.position = new Vector3(0, 50, -200);
            engineParticles.start();
        }
    }

    private setupMesh(): void {
        const assetsManager = new AssetsManager(this.scene);
        const spaceshipMeshTask = assetsManager.addMeshTask('SpaceShipTask', '', 'assets/spaceship/', 'spaceship.obj');
        spaceshipMeshTask.onSuccess = (res) => this.onSpaceShipSuccess(res, this);
        spaceshipMeshTask.onError = this.onSpaceShipError;
        assetsManager.load();
    }

    private onSpaceShipError(task: MeshAssetTask, message: string, exception?: unknown): void {
        logger.error(`Unable to load spaceship mesh: ${message} :: ${exception}`);
        throw new Error('Error loading spaceship assets');
    }

    private onSpaceShipSuccess(task: MeshAssetTask, parent: Node): void {
        const meshes: AbstractMesh[] = task.loadedMeshes;
        meshes.forEach((mesh) => (mesh.parent = parent));
        const mat1 = new StandardMaterial('Blue', this.scene);
        mat1.diffuseColor = new Color3(0.2, 0.2, 0.5);
        mat1.specularColor = new Color3(0.5, 0.6, 0.87);
        // mat1.emissiveColor = new Color3(0.8, 0, 0.5);
        mat1.ambientColor = new Color3(0.2, 0.2, 0.5);
        meshes[0].material = mat1;
        const mat2 = new StandardMaterial('Yellow', this.scene);
        mat2.diffuseColor = new Color3(0.5, 0.5, 0.1);
        mat2.specularColor = new Color3(0.5, 0.6, 0.1);
        // mat1.emissiveColor = new Color3(0, 0.5, 0.5);
        mat2.ambientColor = new Color3(0.5, 0.5, 0.1);
        meshes[1].material = mat2;
    }
}
