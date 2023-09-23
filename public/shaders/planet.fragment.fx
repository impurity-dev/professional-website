precision highp float;

uniform float time;

#include<utils>

void main(void) {
    vec3 r = vec3(gl_FragCoord.xy, sin(time));
    gl_FragColor = vec4(r, 1.);
}