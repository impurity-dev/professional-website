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

export default class SpaceShip {
    public readonly spaceship: TransformNode;
    private readonly assetsManager: AssetsManager;
    private readonly engineParticles: ParticleSystem;

    constructor(private readonly scene: Scene) {
        this.assetsManager = new AssetsManager(this.scene);
        this.engineParticles = new ParticleSystem('EngineParticles', 2000, this.scene);
        this.spaceship = this.createSpaceship();
    }

    private createSpaceship(): TransformNode {
        const spaceship: TransformNode = new TransformNode('Spaceship');
        const scale: number = 0.1;
        spaceship.scaling = new Vector3(scale, scale, scale);
        spaceship.position = new Vector3(0, -25, -100);
        spaceship.rotate(new Vector3(0, 1, 0), Math.PI);

        const spaceshipMeshTask = this.assetsManager.addMeshTask('SpaceShipTask', '', '/assets/', 'spaceship.obj');
        spaceshipMeshTask.onSuccess = (res) => this.onSpaceShipSuccess(res, spaceship);
        spaceshipMeshTask.onError = this.onSpaceShipError;
        this.assetsManager.load();

        this.engineParticles.particleTexture = new Texture('textures/square.png', this.scene);
        const box = MeshBuilder.CreateBox('box', { size: 50 });
        box.parent = spaceship;
        box.isVisible = false;
        box.position = new Vector3(0, 50, -200);
        this.engineParticles.emitter = box;
        this.engineParticles.emitRate = 1000;
        this.engineParticles.minSize = 0.5;
        this.engineParticles.maxSize = 1;
        this.engineParticles.minLifeTime = 0.2;
        this.engineParticles.maxLifeTime = 0.5;
        this.engineParticles.minEmitPower = 1000;
        this.engineParticles.maxEmitPower = 3000;
        this.engineParticles.addColorGradient(0, new Color4(0, 1, 1, 1));
        this.engineParticles.addColorGradient(1, new Color4(1, 0, 1, 0));
        this.engineParticles.preWarmStepOffset = 10;
        this.engineParticles.preWarmCycles = 100;
        this.engineParticles.direction1 = new Vector3(0, 0, -1);
        this.engineParticles.direction2 = new Vector3(0, 0, -1);
        this.engineParticles.minEmitBox = new Vector3(-25, -25, -25);
        this.engineParticles.maxEmitBox = new Vector3(25, 25, 25);
        this.engineParticles.blendMode = ParticleSystem.BLENDMODE_ONEONE;
        this.engineParticles.isLocal = true;
        this.engineParticles.start();

        return spaceship;
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
