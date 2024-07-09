#ifdef GL_ES
    precision highp float;
#endif

#include<utils>

uniform vec2 resolution; // Screen resolution
uniform float time; // time in seconds
uniform sampler2D tex0; // scene buffer

varying vec2 v_uv; // (u, v) pixel coordinates

void main(void) {
    vec2 cPos = -1.0 + 1.0 * gl_FragCoord.xy / resolution.xy;
    float cLength = length(cPos);

    vec2 uv = gl_FragCoord.xy / resolution.xy + (cPos / cLength) * cos(cLength * 12.0 - time * 4.0) * 0.03;
    vec3 col = texture2D(tex0, uv).xyz;
    gl_FragColor = vec4(col.xyz, 1.0);
}