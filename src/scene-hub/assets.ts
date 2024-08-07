import * as BABYLON from '@babylonjs/core';
import { AssetFactory, ContainerNodeAsset } from '../managers/asset-factory';

const DEFAULT_ASSETS = ['__root__', 'Sketchfab_model', '2406db62e15140269797e8f9e53b67dd.fbx', 'RootNode'];
const build = (props: { name: string; meshName: string; assetFactory: AssetFactory }) => () => {
    const { name, meshName, assetFactory } = props;
    const transform = new BABYLON.TransformNode(name, assetFactory.scene, true);
    const asset = props.assetFactory.getContainer(SPACECOLONY_ASSET, [...DEFAULT_ASSETS, meshName, `${meshName}_Texture_Atlas1_0`]);
    const mesh = asset.getChildMeshes().find((m) => m.name === `${meshName}_Texture_Atlas1_0`);
    mesh.parent = transform;
    mesh.rotationQuaternion = null;
    mesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
    asset.dispose();
    return transform;
};
export const SPACECOLONY_ASSET: ContainerNodeAsset = { type: 'container', file: 'space_colony_modular_kit_bash_4k.glb', directory: 'assets/space-colony/' };
export const spaceColony = (props: { assetFactory: AssetFactory }) => ({
    all: () => props.assetFactory.getContainer(SPACECOLONY_ASSET),
    arches: {
        straight: build({ name: 'arch-straight', meshName: 'Cube.1816', ...props }),
        straightHalf: build({ name: 'arch-straighthalf', meshName: 'Cube.1817', ...props }),
        elbow: build({ name: 'arch-elbow', meshName: 'Cube.1853', ...props }),
    },
    beams: {
        long: build({ name: 'beam-long', meshName: 'Cube.1808', ...props }),
        halfLong: build({ name: 'beam-halflong', meshName: 'Cube.1809', ...props }),
    },
    cages: {
        basic: build({ name: 'cage-basic', meshName: 'Cube.1810', ...props }),
        shortBasic: build({ name: 'cage-shortbasic', meshName: 'Cube.1811', ...props }),
        joiner: build({ name: 'cage-joiner', meshName: 'Cube.1936', ...props }),
    },
    computers: {
        blueStand: build({ name: 'computers-bluestand', meshName: 'Cube.1890', ...props }),
        black: build({ name: 'computers-black', meshName: 'Cube.1930', ...props }),
    },
    floors: {
        greys: {
            simple: build({ name: 'floor-grey-simple', meshName: 'Cube.062', ...props }),
            ribbed: build({ name: 'floor-grey-ribbed', meshName: 'Cube.108', ...props }),
            blank: build({ name: 'floor-grey-blank', meshName: 'Cube.1411', ...props }),
            small: build({ name: 'floor-grey-small', meshName: 'Cube.168', ...props }),
        },
        hex: {
            oneLine: build({ name: 'floor-hex-oneline', meshName: 'Cube.1935', ...props }),
        },
    },
    pillars: {
        yellows: {
            tall: build({ name: 'pillar-yellow-tall', meshName: 'Cube.1315', ...props }),
            half: build({ name: 'pillar-yellow-half', meshName: 'Cube.1322', ...props }),
        },
        blues: {
            tall: build({ name: 'pillar-blue-tall', meshName: 'Cube.1323', ...props }),
            half: build({ name: 'pillar-blue-half', meshName: 'Cube.1325', ...props }),
        },
    },
    railings: {
        straight: build({ name: 'railing-straight', meshName: 'Cube.013', ...props }),
        elbow: build({ name: 'railing-elbow', meshName: 'Cube.017', ...props }),
        tops: {
            elbow: build({ name: 'railing-elbow-top', meshName: 'Cube.173', ...props }),
            straight: build({ name: 'railing-straight-top', meshName: 'Cube.1849', ...props }),
        },
        middles: {
            step: build({ name: 'railing-middle-step', meshName: 'Cube.1934', ...props }),
            post: build({ name: 'railing-middle-post', meshName: 'Cube.1850', ...props }),
        },
        bottoms: {
            elbow: build({ name: 'railing-bottom-elbow', meshName: 'Cube.1932', ...props }),
            incline: build({ name: 'railing-bottom-incline', meshName: 'Cube.1933', ...props }),
            straight: build({ name: 'railing-bottom-straight', meshName: 'Cube.1931', ...props }),
        },
    },
    stairs: {
        elbow: build({ name: 'stairs-elbow', meshName: 'Cube.014', ...props }),
        smallStraight: build({ name: 'stairs-smallstraight', meshName: 'Cube.1834', ...props }),
    },
    walls: {
        full: {
            tops: {
                blanks: {
                    elbow: build({ name: 'wall-full-top-blank-corner', meshName: 'Cube.002', ...props }),
                    t: build({ name: 'wall-full-top-blank-t', meshName: 'Cube.053', ...props }),
                    slim: {
                        ribbed: build({ name: 'wall-full-top-blank-slim-ribbed', meshName: 'Cube.117', ...props }),
                    },
                },
                stripes: {
                    garage: build({ name: 'wall-full-top-stripe-garage', meshName: 'Cube.175', ...props }),
                    window: build({ name: 'wall-full-top-stripe-window', meshName: 'Cube.1920', ...props }),
                    door: build({ name: 'wall-full-top-stripe-door', meshName: 'Cube.1923', ...props }),
                    fan: build({ name: 'wall-full-top-stripe-fan', meshName: 'Cube.1924', ...props }),
                    slim: {
                        ribbed: build({ name: 'wall-full-top-stripe-slim-ribbed', meshName: 'Cube.1919', ...props }),
                        blank: build({ name: 'wall-full-top-stripe-slim-blank', meshName: 'Cube.1925', ...props }),
                    },
                    t: {
                        blank: build({ name: 'wall-full-top-stripe-t-blank', meshName: 'Cube.1921', ...props }),
                        stripe: build({ name: 'wall-full-top-stripe-t-stripe', meshName: 'Cube.1922', ...props }),
                    },
                },
            },
            middles: {
                stripes: {
                    elbow: build({ name: 'wall-full-stripe-elbow', meshName: 'Cube.026', ...props }),
                    door: build({ name: 'wall-full-stripe-door', meshName: 'Cube.058', ...props }),
                    window: build({ name: 'wall-full-stripe-window', meshName: 'Cube.112', ...props }),
                    fan: build({ name: 'wall-full-stripe-fan', meshName: 'Cube.1329', ...props }),
                    garage: build({ name: 'wall-full-stripe-garage', meshName: 'Cube.1926', ...props }),
                    slim: {
                        ribbed: build({ name: 'wall-full-stripe-slim-ribbed', meshName: 'Cube.010', ...props }),
                        blank: build({ name: 'wall-full-stripe-slim-blank', meshName: 'Cube.1420', ...props }),
                    },
                    t: {
                        stripe: build({ name: 'wall-full-stripe-t-stripe', meshName: 'Cube.167', ...props }),
                        blank: build({ name: 'wall-full-stripe-t-blank', meshName: 'Cube.061', ...props }),
                    },
                },
            },
        },
        halfs: {
            tops: {
                straight: build({ name: 'wall-half-top-straight', meshName: 'Cube.1875', ...props }),
                elbow: build({ name: 'wall-half-top-elbow', meshName: 'Cube.1876', ...props }),
            },
            bottoms: {
                elbow: build({ name: 'wall-half-bottom-elbow', meshName: 'Cube.1871', ...props }),
                straight: build({ name: 'wall-half-bottom-straight', meshName: 'Cube.1873', ...props }),
            },
            bases: {
                elbow: build({ name: 'wall-half-base-elbow', meshName: 'Cube.1872', ...props }),
                straight: build({ name: 'wall-half-base-straight', meshName: 'Cube.1874', ...props }),
            },
        },
        quarters: {
            elbow: build({ name: 'wall-quarter-elbow', meshName: 'Cube.039', ...props }),
        },
    },
    tunnels: {
        straight: build({ name: 'tunnel-straight', meshName: 'Circle.018', ...props }),
        elbow: build({ name: 'tunnel-elbow', meshName: 'Circle.021', ...props }),
        cross: build({ name: 'tunnel-cross', meshName: 'Circle.022', ...props }),
        end: build({ name: 'tunnel-end', meshName: 'Circle.024', ...props }),
    },
    test: {
        object: build({ name: 'test', meshName: 'Cube.1936', ...props }),
    },
});
