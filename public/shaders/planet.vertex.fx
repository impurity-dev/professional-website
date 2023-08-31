precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;
uniform float time;

// Varying
varying vec2 vUV;

void main(void) {
    vec3 p = position;
    p.x = p.x + sin(2.0 * position.y + time);
    p.y = p.y + sin(time + 4.0);
    gl_Position = worldViewProjection * vec4(p, 1.0);
    vUV = uv;
}