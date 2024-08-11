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
const withScale = (builder: () => BABYLON.TransformNode, scale: BABYLON.Vector3) => () => {
    const transform = builder();
    transform.scaling = scale;
    return transform;
};

const withInvertedMesh = (builder: () => BABYLON.TransformNode) => () => {
    const transform = builder();
    transform.getChildMeshes()[0].scaling = new BABYLON.Vector3(1, -1, 1);
    return transform;
};

const buildGlass = (props: { name: string; meshName: string; assetFactory: AssetFactory }) => () => {
    const { name, meshName, assetFactory } = props;
    const transform = new BABYLON.TransformNode(name, assetFactory.scene, true);
    const asset = props.assetFactory.getContainer(SPACECOLONY_ASSET, [
        ...DEFAULT_ASSETS,
        meshName,
        `${meshName}_Texture_Atlas1_0`,
        meshName,
        `${meshName}_Glass_0`,
    ]);
    const frameMesh = asset.getChildMeshes().find((m) => m.name === `${meshName}_Texture_Atlas1_0`);
    const glassMesh = asset.getChildMeshes().find((m) => m.name === `${meshName}_Glass_0`);
    frameMesh.parent = transform;
    frameMesh.rotationQuaternion = null;
    frameMesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
    glassMesh.parent = transform;
    glassMesh.rotationQuaternion = null;
    glassMesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
    asset.dispose();
    return transform;
};

const buildChair = (props: { name: string; assetFactory: AssetFactory }) => () => {
    const { name, assetFactory } = props;
    const transform = new BABYLON.TransformNode(name, assetFactory.scene, true);
    const backMeshName = 'Cube.2056';
    const frontMeshName = 'Cube.2057';
    const asset = props.assetFactory.getContainer(SPACECOLONY_ASSET, [
        ...DEFAULT_ASSETS,
        backMeshName,
        `${backMeshName}_Texture_Atlas1_0`,
        frontMeshName,
        `${frontMeshName}__0`,
    ]);
    const backMesh = asset.getChildMeshes().find((m) => m.name === `${backMeshName}_Texture_Atlas1_0`);
    const frontMesh = asset.getChildMeshes().find((m) => m.name === `${frontMeshName}__0`);
    backMesh.parent = transform;
    backMesh.rotationQuaternion = null;
    backMesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
    frontMesh.parent = transform;
    frontMesh.rotationQuaternion = null;
    frontMesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
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
        angled: build({ name: 'arch-angled', meshName: 'Cube.924', ...props }),
    },
    beams: {
        long: build({ name: 'beam-long', meshName: 'Cube.1808', ...props }),
        halfLong: build({ name: 'beam-halflong', meshName: 'Cube.1809', ...props }),
    },
    cages: {
        basic: build({ name: 'cage-basic', meshName: 'Cube.1810', ...props }),
        shortBasic: build({ name: 'cage-shortbasic', meshName: 'Cube.1811', ...props }),
        door: build({ name: 'case-door', meshName: 'Cube.1957', ...props }),
    },
    frames: {
        joiner: build({ name: 'frames-joiner', meshName: 'Cube.1936', ...props }),
        beam: build({ name: 'frames-beam', meshName: 'Cube.1937', ...props }),
        beamWithJoiners: build({ name: 'frames-beamwithjoiners', meshName: 'Cube.718', ...props }),
        structure: build({ name: 'frames-structure', meshName: 'Cube.701', ...props }),
        base: build({ name: 'frames-base', meshName: 'Cube.735', ...props }),
        box: build({ name: 'frames-box', meshName: 'Cube.971', ...props }),
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
            elbow: build({ name: 'floor-grey-elbow', meshName: 'Cube.2780', ...props }),
        },
        hexes: {
            noLine: build({ name: 'floor-hex-noline', meshName: 'Cube.1956', ...props }),
            oneLine: build({ name: 'floor-hex-oneline', meshName: 'Cube.1935', ...props }),
            cornerLineStraight: build({ name: 'floor-hex-cornerlinestraight', meshName: 'Cube.1955', ...props }),
            cornerLineRound: build({ name: 'floor-hex-cornerlineround', meshName: 'Cube.1959', ...props }),
        },
        blacks: {
            allLines: build({ name: 'floor-black-alllines', meshName: 'Cube.326', ...props }),
            oneLine: {
                vertical: build({ name: 'floor-black-oneline-vertical', meshName: 'Cube.334', ...props }),
                horizontal: build({ name: 'floor-black-oneline-horizontal', meshName: 'Cube.336', ...props }),
            },
            corner: build({ name: 'floor-black-corner', meshName: 'Cube.337', ...props }),
        },
    },
    indicators: {
        green: build({ name: 'indicator-green', meshName: 'Plane.030', ...props }),
        red: build({ name: 'indicator-red', meshName: 'Plane.031', ...props }),
        black: build({ name: 'indicator-black', meshName: 'Plane.032', ...props }),
        yellow: build({ name: 'indicator-yellow', meshName: 'Plane.033', ...props }),
        orange: build({ name: 'indicator-orange', meshName: 'Plane.034', ...props }),
    },
    lights: {
        angles: {
            small: build({ name: 'light-angles-small', meshName: 'Cube.2028', ...props }),
            large: build({ name: 'light-angles-large', meshName: 'Cube.2031', ...props }),
        },
        long: build({ name: 'light-long', meshName: 'Cube.268', ...props }),
        short: build({ name: 'light-short', meshName: 'Cube.386', ...props }),
    },
    pillars: {
        yellows: {
            tall: {
                bulk: build({ name: 'pillar-yellow-tall-bulk', meshName: 'Cube.681', ...props }),
                slim: build({ name: 'pillar-yellow-tall-slim', meshName: 'Cube.1315', ...props }),
            },
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
        straight: {
            long: build({ name: 'stairs-straight-long', meshName: 'Cube.722', ...props }),
            small: build({ name: 'stairs-straight-small', meshName: 'Cube.1834', ...props }),
        },
    },
    walls: {
        glass: {
            full: buildGlass({ name: 'walls-glass-full', meshName: 'Cube.2324', ...props }),
            half: buildGlass({ name: 'walls-glass-half', meshName: 'Cube.2325', ...props }),
            elbow: buildGlass({ name: 'walls-glass-elbow', meshName: 'Cube.2326', ...props }),
            door: buildGlass({ name: 'walls-glass-door', meshName: 'Cube.2508', ...props }),
            frame: build({ name: 'walls-glass-door', meshName: 'Cube.2512', ...props }),
            doubleElbow: buildGlass({ name: 'walls-glass-doubleelbow', meshName: 'Cube.2813', ...props }),
        },
        full: {
            tops: {
                blanks: {
                    elbow: build({ name: 'wall-full-top-blank-corner', meshName: 'Cube.002', ...props }),
                    door: build({ name: 'wall-full-blank-door', meshName: 'Cube.3521', ...props }),
                    window: build({ name: 'wall-full-blank-window', meshName: 'Cube.3525', ...props }),
                    fan: build({ name: 'wall-full-blank-fan', meshName: 'Cube.738', ...props }),
                    t: {
                        jagged: build({ name: 'wall-full-top-blank-t-jagged', meshName: 'Cube.053', ...props }),
                        flat: build({ name: 'wall-full-top-blank-t-flat', meshName: 'Cube.712', ...props }),
                    },
                    slim: {
                        ribbed: build({ name: 'wall-full-top-blank-slim-ribbed', meshName: 'Cube.117', ...props }),
                        blank: build({ name: 'wall-full-top-blank-slim-blank', meshName: 'Cube.736', ...props }),
                    },
                },
                stripes: {
                    tunnel: build({ name: 'wall-full-top-stripe-tunnel', meshName: 'Cube.737', ...props }),
                    elbow: build({ name: 'wall-full-top-stripe-elbow', meshName: 'Cube.331', ...props }),
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
                    halfElbow: build({ name: 'wall-full-top-stripe-half-elbow', meshName: 'Cube.1992', ...props }),
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
    pipes: {
        larges: {
            straight: {
                short: build({ name: 'pipes-large-straight-short', meshName: 'Cylinder.015', ...props }),
                medium: build({ name: 'pipes-large-straight-medium', meshName: 'Cylinder.013', ...props }),
                long: build({ name: 'pipes-large-straight-long', meshName: 'Cylinder.014', ...props }),
            },
            crosses: {
                short: build({ name: 'pipes-large-cross-short', meshName: 'Cylinder.056', ...props }),
                medium: build({ name: 'pipes-large-cross-medium', meshName: 'Cylinder.034', ...props }),
                long: build({ name: 'pipes-large-cross-long', meshName: 'Cylinder.044', ...props }),
            },
            elbows: {
                black: build({ name: 'pipes-large-elbow-black', meshName: 'Pipe_Corner', ...props }),
                orange: build({ name: 'pipes-large-elbow-orange', meshName: 'Pipe_Corner.001', ...props }),
            },
        },
        slims: {
            straights: {
                short: build({ name: 'pipes-slim-straight-short', meshName: 'Cylinder.048', ...props }),
                medium: build({ name: 'pipes-slim-straight-medium', meshName: 'Cylinder.049', ...props }),
                long: build({ name: 'pipes-slim-straight-long', meshName: 'Cylinder.046', ...props }),
            },
            crosses: {
                short: build({ name: 'pipes-slim-cross-short', meshName: 'Cylinder.057', ...props }),
                medium: build({ name: 'pipes-slim-cross-medium', meshName: 'Cylinder.055', ...props }),
                long: build({ name: 'pipes-slim-cross-long', meshName: 'Cylinder.047', ...props }),
            },
            elbows: {
                black: build({ name: 'pipes-slim-elbow-black', meshName: 'Pipe_Corner.004', ...props }),
                orange: build({ name: 'pipes-slim-elbow-orange', meshName: 'Pipe_Corner.008', ...props }),
            },
        },
    },
    props: {
        oilSpill: {
            slim: build({ name: 'props-oilspill-slim', meshName: 'Plane.017', ...props }),
            large: build({ name: 'props-oilspill-large', meshName: 'Plane.018', ...props }),
        },
        buttonsbox: build({ name: 'props-buttonsbox', meshName: 'Cube.1984', ...props }),
        chair: buildChair({ name: 'props-chair', ...props }),
        screwDriver: withScale(build({ name: 'props-screwdriver', meshName: 'Cube.244', ...props }), new BABYLON.Vector3(0.05, 0.05, 0.05)),
        coolantBox: withInvertedMesh(build({ name: 'props-coolantbox', meshName: 'Cube.689', ...props })),
        toolBox: build({ name: 'props-toolbox', meshName: 'Cube.907', ...props }),
        cardboard: {
            cube: build({ name: 'props-cardboard-cube', meshName: 'Cube.1994', ...props }),
            rectangle: build({ name: 'props-cardboard-rectangle', meshName: 'Cube.2005', ...props }),
        },
        desks: {
            oneComputer: build({ name: 'props-desks-onecomputer', meshName: 'Cube.3248', ...props }),
            threeComputers: build({ name: 'props-desk-threecomputers', meshName: 'Cube.688', ...props }),
            fourComputers: build({ name: 'props-desk-fourcomputers', meshName: 'Cube.678', ...props }),
        },
        microscope: build({ name: 'props-microscope', meshName: 'Cube.3558', ...props }),
        lamps: {
            one: build({ name: 'props-lamp-one', meshName: 'Cube.3559', ...props }),
            two: build({ name: 'props-lamp-two', meshName: 'Cube.3560', ...props }),
        },
        printer: withScale(build({ name: 'props-printer', meshName: 'Cube.3561', ...props }), new BABYLON.Vector3(0.25, 0.25, 0.25)),
        server: withScale(build({ name: 'props-server', meshName: 'Cube.3569', ...props }), new BABYLON.Vector3(0.25, 0.25, 0.25)),
        engineeringSign: withInvertedMesh(build({ name: 'props-engineeringsign', meshName: 'Cube.856', ...props })),
        buzzSaw: build({ name: 'props-buzzsaw', meshName: 'Cylinder', ...props }),
        reactor: withInvertedMesh(build({ name: 'props-reactor', meshName: 'Cylinder.008', ...props })),
        plugs: build({ name: 'props-plugs', meshName: 'Cylinder.063', ...props }),
        testTubes: {
            blue: buildGlass({ name: 'props-testtubes-blue', meshName: 'Cylinder.074', ...props }),
            red: buildGlass({ name: 'props-testtubes-red', meshName: 'Cylinder.075', ...props }),
            twelve: buildGlass({ name: 'props-testtubes-twelve', meshName: 'Cylinder.093', ...props }),
        },
    },
    tunnels: {
        straight: build({ name: 'tunnel-straight', meshName: 'Circle.018', ...props }),
        elbow: build({ name: 'tunnel-elbow', meshName: 'Circle.021', ...props }),
        cross: build({ name: 'tunnel-cross', meshName: 'Circle.022', ...props }),
        end: build({ name: 'tunnel-end', meshName: 'Circle.024', ...props }),
    },
    letters: {
        a: build({ name: 'letter-a', meshName: 'Cube.3590', ...props }),
        b: build({ name: 'letter-b', meshName: 'Cube.3591', ...props }),
        c: build({ name: 'letter-c', meshName: 'Cube.3592', ...props }),
        d: build({ name: 'letter-d', meshName: 'Cube.3593', ...props }),
        e: build({ name: 'letter-e', meshName: 'Cube.3594', ...props }),
        f: build({ name: 'letter-f', meshName: 'Cube.3595', ...props }),
        g: build({ name: 'letter-g', meshName: 'Cube.3596', ...props }),
        h: build({ name: 'letter-h', meshName: 'Cube.3597', ...props }),
        i: build({ name: 'letter-i', meshName: 'Cube.3598', ...props }),
        j: build({ name: 'letter-j', meshName: 'Cube.3599', ...props }),
        k: build({ name: 'letter-k', meshName: 'Cube.3600', ...props }),
        l: build({ name: 'letter-l', meshName: 'Cube.3601', ...props }),
        m: build({ name: 'letter-m', meshName: 'Cube.3602', ...props }),
        n: build({ name: 'letter-n', meshName: 'Cube.3603', ...props }),
        o: build({ name: 'letter-o', meshName: 'Cube.3604', ...props }),
        p: build({ name: 'letter-p', meshName: 'Cube.3605', ...props }),
        q: build({ name: 'letter-q', meshName: 'Cube.3606', ...props }),
        r: build({ name: 'letter-r', meshName: 'Cube.3607', ...props }),
        s: build({ name: 'letter-s', meshName: 'Cube.3608', ...props }),
        t: build({ name: 'letter-t', meshName: 'Cube.3609', ...props }),
        u: build({ name: 'letter-u', meshName: 'Cube.3610', ...props }),
        v: build({ name: 'letter-v', meshName: 'Cube.3611', ...props }),
        w: build({ name: 'letter-w', meshName: 'Cube.3612', ...props }),
        x: build({ name: 'letter-x', meshName: 'Cube.3613', ...props }),
        y: build({ name: 'letter-y', meshName: 'Cube.3614', ...props }),
        z: build({ name: 'letter-z', meshName: 'Cube.3615', ...props }),
    },
    numbers: {
        zero: build({ name: 'number-zero', meshName: 'Cube.3625', ...props }),
        one: build({ name: 'number-one', meshName: 'Cube.3616', ...props }),
        two: build({ name: 'number-two', meshName: 'Cube.3617', ...props }),
        three: build({ name: 'number-three', meshName: 'Cube.3618', ...props }),
        four: build({ name: 'number-four', meshName: 'Cube.3619', ...props }),
        five: build({ name: 'number-five', meshName: 'Cube.3620', ...props }),
        six: build({ name: 'number-six', meshName: 'Cube.3621', ...props }),
        seven: build({ name: 'number-seven', meshName: 'Cube.3622', ...props }),
        eight: build({ name: 'number-eight', meshName: 'Cube.3623', ...props }),
        nine: build({ name: 'number-nine', meshName: 'Cube.3624', ...props }),
    },
});
