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

void main(void) {
    gl_Position = worldViewProjection * vec4(position, 1.0);

    v_uv = uv;
}