precision highp float;
varying vec2 vUV;

uniform vec2 u_resolution;

void main() {
    vec2 position = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(1.0, 0.5, 0.5);
    gl_FragColor = vec4(color, 1.0);
}