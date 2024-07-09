#ifdef GL_ES
    precision highp float;
#endif

#include<utils>

uniform vec2 resolution; // Screen resolution
uniform float time; // time in seconds
uniform float duration; // scene buffer
uniform sampler2D tex0; // scene buffer
uniform sampler2D tex1; // scene buffer

varying vec2 v_uv; // (u, v) pixel coordinates
varying vec3 v_position;

void main(void) {
    vec2 p = v_position.xy;
    float len = length(p);
    vec2 ripple = v_uv + p/len * 0.03 * cos(len * 12.0 - time * 4.0);
    float delta = (sin(mod(time, duration) * (2.0 * PI / duration)) + 1.0 ) /2.0;
    vec2 uv = mix(ripple, v_uv, 0.0);
    vec3 color = texture2D(tex0, uv).rgb;
    gl_FragColor = vec4(color, 1.0);
}