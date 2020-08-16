import * as BABYLON from 'babylonjs';

export const createCube3D = (id) => {
    const canvas = document.getElementById(id);
    const engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    const sky = new BABYLON.CubeTexture('textures/TropicalSunnyDay', scene);
    const skyBox = scene.createDefaultSkybox(sky, false, 1000, 0, false);
    var camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 1.65, 1, BABYLON.Vector3.Zero(), scene);

    camera.inertia = 0.7;
    camera.attachControl(canvas, true);

    BABYLON.Effect.ShadersStore['customVertexShader'] = `   
		precision highp float;

    	attribute vec3 position;
        attribute vec3 barycentric;

    	uniform mat4 worldViewProjection;

        varying vec3 vBarycentric;
    	void main(void) {
            vBarycentric = barycentric;
    	    gl_Position = worldViewProjection * vec4(position, 1.0);
    	}`;

    BABYLON.Effect.ShadersStore['customFragmentShader'] = `
	    precision highp float;

        uniform float edgeThickness;

        varying vec3 vBarycentric;

        uniform vec4 edgeColor;

        const vec4 interiorColor = vec4(0.0, 0.0, 0.0, 0.0);

        #define METHOD 1

        float edgeFactor(){
            vec3 d = fwidth(vBarycentric);
            vec3 a3 = smoothstep(vec3(0.0), d * edgeThickness, vBarycentric);
            return min(min(a3.x, a3.y), a3.z);
        }

    	void main(void) {
            #if METHOD == 1
                gl_FragColor = mix(edgeColor, interiorColor, edgeFactor());
            #else
                float d = min(vBarycentric.x, min(vBarycentric.y, vBarycentric.z));
                float I = exp2(-100. * d / edgeThickness);
                gl_FragColor = I * edgeColor + (1.0 - I) * interiorColor;
            #endif
    	}`;

    var shaderMaterial = new BABYLON.ShaderMaterial(
        'shader',
        scene,
        {
            vertex: 'custom',
            fragment: 'custom',
        },
        {
            attributes: ['position', 'normal', 'uv', 'barycentric', 'edgeColor'],
            uniforms: ['worldViewProjection', 'edgeThickness'],
            needAlphaBlending: true,
        },
    );

    var mainTexture = new BABYLON.Texture('textures/amiga.jpg', scene);

    shaderMaterial.setTexture('textureSampler', mainTexture);
    shaderMaterial.sideOrientation = BABYLON.Material.ClockWiseSideOrientation;
    // shaderMaterial.transparencyModee = BABYLON.Material.MATERIAL_ALPHABLEND;
    shaderMaterial.setColor4('edgeColor', new BABYLON.Color4(1, 1, 1, 1));

    var mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 3, segments: 16 }, scene);

    mesh.material = shaderMaterial;
    mesh.convertToFlatShadedMesh();

    var gl = new BABYLON.GlowLayer('glow', scene);

    gl.intensity = 1.2;

    gl.addExcludedMesh(skyBox);
    gl.referenceMeshToUseItsOwnMaterial(mesh);

    gl.customEmissiveColorSelector = (mesh, submesh, material, result) => {
        material.setColor4('edgeColor', new BABYLON.Color4(0.0, 1, 0.0, 1));
    };

    shaderMaterial.onBindObservable.add((mesh) => {
        mesh.material.setColor4('edgeColor', new BABYLON.Color4(1, 1, 1, 1));
    });

    const numVertices = mesh.getVertexBuffer('position').getData().length / 3;
    const barycentrics = [];

    for (let i = 0; i < numVertices / 3; ++i) {
        barycentrics.push(1, 0, 0);
        barycentrics.push(0, 1, 0);
        barycentrics.push(0, 0, 1);
    }

    mesh.setVerticesData('barycentric', barycentrics, false, 3);

    var time = 0;
    scene.onBeforeRenderObservable.add(() => {
        shaderMaterial.setFloat('edgeThickness', 3.0);
        //shaderMaterial.setFloat("edgeThickness", 1.0 + Math.abs(10 * Math.cos(time)));
        time += (2 * Math.PI) / 60 / 2;

        gl.intensity = 1.2 + 0.4 * Math.cos(time);

        mesh.rotation.y += (2 * Math.PI) / 60 / 12;
        mesh.rotation.x += (2 * Math.PI) / 60 / 24;
    });

    return scene;
};
