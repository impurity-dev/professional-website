#ifdef GL_ES
    precision highp float;
#endif

#include<utils>

uniform vec3 u_landColor1;
uniform vec3 u_landColor2;
uniform float time; // time

varying vec2 v_uv; // (u, v) pixel coordinates

void main(void) {
    float n = sin(v_uv.y);
    vec3 color = mix(vec3(0.7, .0, .0), vec3(0., 0., 0.2), n);
    gl_FragColor = vec4(color, 1.0);
}