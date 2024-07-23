// Vertex shader
#if defined(WEBGL2) || defines(WEBGPU)
precision highp sampler2DArray;
#endif
precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;


uniform mat4 u_World;
uniform mat4 u_ViewProjection;
uniform vec3 u_outline;
uniform vec3 u_cameraPosition;
uniform float u_glossiness;
uniform vec3 u_diffuseColor;
uniform vec3 u_specularColor;
uniform vec3 u_DiffuseColor;
#ifdef UVTRANSFORM0
uniform mat4 textureTransform;
#endif
uniform float u_time;


uniform sampler2D NoiseTexture;


varying vec4 v_output1;
#ifdef UVTRANSFORM0
varying vec2 transformedUV;
#endif
#ifdef VMAINUV
varying vec2 vMainuv;
#endif
varying vec4 v_output2;


#include<helperFunctions>

#include<lightVxUboDeclaration>[0..maxSimultaneousLights]



float u_glossPower = 512.0;
float u_thickness = 0.027;


void main(void) {
mat3 u_World_NUS = mat3(u_World);
#ifdef NONUNIFORMSCALING
u_World_NUS = transposeMat3(inverseMat3(u_World_NUS));
#endif
vec4 output2 = vec4(u_World_NUS * normal, 0.0);
vec4 output1 = u_World * vec4(position, 1.0);
v_output1 = output1;
vec4 worldPos = output1;
#include<shadowsVertex>[0..maxSimultaneousLights]
vec4 output0 = u_ViewProjection * output1;
gl_Position = output0;
#ifdef UVTRANSFORM0
transformedUV = vec2(textureTransform * vec4(uv.xy, 1.0, 0.0));
#elif defined(VMAINUV)
vMainuv = uv.xy;
#endif
v_output2 = output2;

}

