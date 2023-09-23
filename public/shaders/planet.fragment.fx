precision highp float;

uniform float time;

void main(void) {
    gl_FragColor = vec4(sin(time), 0., 0., 1. );
}