#ifdef GL_ES
    precision highp float;
#endif

varying vec2 vUV;


void main(void) {
    vec3 color = vec3(1.0);
    gl_FragColor = vec4(color, 1.0);
}