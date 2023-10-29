import { AbstractMesh, AssetsManager, MeshAssetTask, Scene, TransformNode } from '@babylonjs/core';

const onError = (error: string) => (task: MeshAssetTask, message: string, exception?: unknown) => {
    console.error(`${task.name} task failed :: ${error} :: ${message} :: ${exception}`);
    throw new Error(error);
};

const onSuccess =
    (parent: TransformNode) =>
    (task: MeshAssetTask): void => {
        const meshes: AbstractMesh[] = task.loadedMeshes;
        meshes.forEach((mesh) => {
            mesh.parent = parent;
            mesh.receiveShadows = true;
            mesh.checkCollisions = true;
        });
    };

export class Column1Entity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('Column1', scene);
        const task = manager.addMeshTask('Column1 Task', '', 'objects/low-poly/', 'Column_1.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading Column1 Entity');
    }
}

export class Column2Entity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('Column2', scene);
        const task = manager.addMeshTask('Column2 Task', '', 'objects/low-poly/', 'Column_2.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading Column2 Entity');
    }
}

export class Column3Entity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('Column3', scene);
        const task = manager.addMeshTask('Column3 Task', '', 'objects/low-poly/', 'Column_3.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading Column3 Entity');
    }
}

export class ColumnSlimEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('Column3', scene);
        const task = manager.addMeshTask('ColumnSlim Task', '', 'objects/low-poly/', 'Column_Slim.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading ColumnSlim Entity');
    }
}

export class DetailsArrowEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsArrow', scene);
        const task = manager.addMeshTask('DetailsArrow Task', '', 'objects/low-poly/', 'Details_Arrow.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsArrow Entity');
    }
}

export class DetailsArrow2Entity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsArrow2', scene);
        const task = manager.addMeshTask('DetailsArrow2 Task', '', 'objects/low-poly/', 'Details_Arrow_2.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsArrow2 Entity');
    }
}

export class DetailsBasic1Entity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsBasic1', scene);
        const task = manager.addMeshTask('DetailsBasic1 Task', '', 'objects/low-poly/', 'Details_Basic_1.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsBasic1 Entity');
    }
}

export class DetailsBasic2Entity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsBasic2', scene);
        const task = manager.addMeshTask('DetailsBasic2 Task', '', 'objects/low-poly/', 'Details_Basic_2.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsBasic2 Entity');
    }
}

export class DetailsBasic3Entity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsBasic3', scene);
        const task = manager.addMeshTask('DetailsBasic3 Task', '', 'objects/low-poly/', 'Details_Basic_3.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsBasic3 Entity');
    }
}

export class DetailsBasic4Entity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsBasic4', scene);
        const task = manager.addMeshTask('DetailsBasic4 Task', '', 'objects/low-poly/', 'Details_Basic_4.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsBasic4 Entity');
    }
}

export class DetailsCylinderEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsCylinder', scene);
        const task = manager.addMeshTask('DetailsCylinder Task', '', 'objects/low-poly/', 'Details_Cylinder.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsCylinder Entity');
    }
}

export class DetailsCylinderLongEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsCylinderLong', scene);
        const task = manager.addMeshTask('DetailsCylinderLong Task', '', 'objects/low-poly/', 'Details_Cylinder_Long.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsCylinderLong Entity');
    }
}

export class DetailsDotsEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsDots', scene);
        const task = manager.addMeshTask('DetailsDots Task', '', 'objects/low-poly/', 'Details_Dots.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsDots Entity');
    }
}

export class DetailsHexagonEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsHexagon', scene);
        const task = manager.addMeshTask('DetailsHexagon Task', '', 'objects/low-poly/', 'Details_Hexagon.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsHexagon Entity');
    }
}

export class DetailsOutputEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsOutput', scene);
        const task = manager.addMeshTask('DetailsOutput Task', '', 'objects/low-poly/', 'Details_Output.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsOutput Entity');
    }
}

export class DetailsOutputSmallEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsOutputSmall', scene);
        const task = manager.addMeshTask('DetailsOutputSmall Task', '', 'objects/low-poly/', 'Details_Output_Small.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsOutputSmall Entity');
    }
}

export class DetailsPipesLongEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsPipesLong', scene);
        const task = manager.addMeshTask('DetailsPipesLong Task', '', 'objects/low-poly/', 'Details_Pipes_Long.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsPipesLong Entity');
    }
}

export class DetailsPipesMediumEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsPipesMedium', scene);
        const task = manager.addMeshTask('DetailsPipesMedium Task', '', 'objects/low-poly/', 'Details_Pipes_Medium.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsPipesMedium Entity');
    }
}

export class DetailsPipesSmallEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsPipesSmall', scene);
        const task = manager.addMeshTask('DetailsPipesSmall Task', '', 'objects/low-poly/', 'Details_Pipes_Small.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsPipesSmall Entity');
    }
}

export class DetailsPlateDetailsEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsPlateDetails', scene);
        const task = manager.addMeshTask('DetailsPlateDetails Task', '', 'objects/low-poly/', 'Details_Plate_Details.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsPlateDetails Entity');
    }
}

export class DetailsPlateLargeEntity extends TransformNode {
    constructor(
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super('DetailsPlateLarge', scene);
        const task = manager.addMeshTask('DetailsPlateLarge Task', '', 'objects/low-poly/', 'Details_Plate_Large.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsPlateLarge Entity');
    }
}

export class DetailsPlateLongEntity extends TransformNode {
    constructor(
        readonly id: string,
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super(`${id} DetailsPlateLong`, scene);
        const task = manager.addMeshTask('DetailsPlateLong Task', '', 'objects/low-poly/', 'Details_Plate_Long.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError('Error loading DetailsPlateLong Entity');
    }
}

export class DetailsPlateSmallEntity extends TransformNode {
    constructor(
        readonly id: string,
        readonly scene: Scene,
        readonly manager: AssetsManager,
    ) {
        super(`${id} DetailsPlateSmall`, scene);
        const task = manager.addMeshTask(`${this.name} Task`, '', 'objects/low-poly/', 'Details_Plate_Small.obj');
        task.onSuccess = onSuccess(this);
        task.onError = onError(`Error loading ${this.name} Entity`);
    }
}
