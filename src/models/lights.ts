import * as BABYLON from '@babylonjs/core';
import * as models from '.';
import { take, tap } from 'rxjs';

export const light14 = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => new Light14(props);
export class Light14 extends models.Model {
    private pointLight: BABYLON.PointLight;
    private lightMesh: BABYLON.AbstractMesh;
    private lightMaterial: BABYLON.PBRMaterial;

    constructor(props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) {
        const { scene, entityManager } = props;
        super({
            name: 'light14',
            scene,
            entityManager,
            asset: { file: 'scifi_light_14.glb', directory: 'assets/lights/' },
        });
        this.onLoad
            .pipe(
                take(1),
                tap(() => {
                    this.lightMesh = this.transform.getChildMeshes().find((m) => m.name === 'Light_14_Material #38_0');
                    this.lightMaterial = this.lightMesh.material as BABYLON.PBRMaterial;
                }),
            )
            .subscribe();
        this.pointLight = new BABYLON.PointLight('light14-pl', new BABYLON.Vector3(0, 0, 0), scene);
        this.pointLight.parent = this.transform;
        this.pointLight.position = new BABYLON.Vector3(0, -10, 25);
    }

    set color(color: BABYLON.Color3) {
        this.lightMaterial.emissiveColor = color;
        this.lightMaterial.albedoColor = color;
        this.lightMaterial.reflectionColor = color;
        this.pointLight.diffuse = color;
        this.pointLight.specular = color;
    }

    set toggle(isOn: boolean) {
        this.lightMesh.visibility = isOn ? 1 : 0;
        this.pointLight.intensity = isOn ? 1000 : 0;
    }

    set includeMeshes(meshes: BABYLON.AbstractMesh[]) {
        this.pointLight.includedOnlyMeshes = [...meshes, ...this.transform.getChildMeshes()];
    }
}

export const light15 = (props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) => new Light15(props);
export class Light15 extends models.Model {
    private pointLight: BABYLON.PointLight;
    private lightMesh: BABYLON.AbstractMesh;
    private lightMaterial: BABYLON.PBRMaterial;

    constructor(props: { scene: BABYLON.Scene; entityManager: models.EntityManager }) {
        const { scene, entityManager } = props;
        super({
            name: 'light14',
            scene,
            entityManager,
            asset: { file: 'scifi_light_15.glb', directory: 'assets/lights/' },
        });
        this.transform.position = new BABYLON.Vector3(-2, 0, 0);
        this.transform.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
        this.transform.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
        this.onLoad
            .pipe(
                take(1),
                tap(() => {
                    // this.lightMesh = this.transform.getChildMeshes().find((m) => m.name === 'Light_14_Material #38_0');
                    // this.lightMaterial = this.lightMesh.material as BABYLON.PBRMaterial;
                }),
            )
            .subscribe();
        this.pointLight = new BABYLON.PointLight('light14-pl', new BABYLON.Vector3(0, 0, 0), scene);
        this.pointLight.parent = this.transform;
        this.pointLight.position = new BABYLON.Vector3(0, -10, 25);
    }

    setColor = (color: BABYLON.Color3) => {
        this.lightMaterial.emissiveColor = color;
        this.lightMaterial.albedoColor = color;
        this.lightMaterial.reflectionColor = color;
        this.pointLight.diffuse = color;
        this.pointLight.specular = color;
    };

    toggle = (isOn: boolean) => {
        this.lightMesh.visibility = isOn ? 1 : 0;
        this.pointLight.intensity = isOn ? 1 : 0;
    };

    include = (meshes: BABYLON.AbstractMesh[]) => {
        this.pointLight.includedOnlyMeshes = [...meshes, ...this.transform.getChildMeshes()];
    };
}
