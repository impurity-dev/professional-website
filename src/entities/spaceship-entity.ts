import {
    AbstractMesh,
    AssetsManager,
    Color3,
    Color4,
    MeshAssetTask,
    MeshBuilder,
    Node,
    ParticleSystem,
    Scene,
    StandardMaterial,
    Texture,
    TransformNode,
    Vector3,
} from '@babylonjs/core';

export default class SpaceShipEntity extends TransformNode {
    constructor(private readonly scene: Scene) {
        super('Spaceship');
        const scale: number = 0.1;
        this.scaling = new Vector3(scale, scale, scale);
        this.position = new Vector3(0, -25, -100);
        this.rotate(new Vector3(0, 1, 0), Math.PI);
        this.setupMesh();
        this.setupEngineParticles();
    }

    private setupMesh(): void {
        const assetsManager = new AssetsManager(this.scene);
        const spaceshipMeshTask = assetsManager.addMeshTask('SpaceShipTask', '', 'assets/', 'spaceship.obj');
        spaceshipMeshTask.onSuccess = (res) => this.onSpaceShipSuccess(res, this);
        spaceshipMeshTask.onError = this.onSpaceShipError;
        assetsManager.load();
    }

    private setupEngineParticles(): void {
        const engineParticles = new ParticleSystem('EngineParticles', 2000, this.scene);
        engineParticles.particleTexture = new Texture('textures/square.png', this.scene);
        const box = MeshBuilder.CreateBox('box', { size: 50 });
        box.parent = this;
        box.isVisible = false;
        box.position = new Vector3(0, 50, -200);
        engineParticles.emitter = box;
        engineParticles.emitRate = 1000;
        engineParticles.minSize = 0.5;
        engineParticles.maxSize = 1;
        engineParticles.minLifeTime = 0.2;
        engineParticles.maxLifeTime = 0.5;
        engineParticles.minEmitPower = 1000;
        engineParticles.maxEmitPower = 3000;
        engineParticles.addColorGradient(0, new Color4(0, 1, 1, 1));
        engineParticles.addColorGradient(1, new Color4(1, 0, 1, 0));
        engineParticles.preWarmStepOffset = 10;
        engineParticles.preWarmCycles = 100;
        engineParticles.direction1 = new Vector3(0, 0, -1);
        engineParticles.direction2 = new Vector3(0, 0, -1);
        engineParticles.minEmitBox = new Vector3(-25, -25, -25);
        engineParticles.maxEmitBox = new Vector3(25, 25, 25);
        engineParticles.blendMode = ParticleSystem.BLENDMODE_ONEONE;
        engineParticles.isLocal = true;
        engineParticles.start();
    }

    private onSpaceShipError(task: MeshAssetTask, message: string, exception?: any): void {
        console.error(`Could not load spaceship with error: ${message}`);
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
