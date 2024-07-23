#ifdef GL_ES
    precision highp float;
#endif

// Attributes
attribute vec3 position;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

// Normal
varying vec2 v_uv;
varying vec3 v_position;

void main(void) {
    v_position = position;
    vec4 p = vec4(position, 1.);
    gl_Position = worldViewProjection * p;
    v_uv = uv;
}