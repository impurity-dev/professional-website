#define PI 3.14159265 

float rand(float n){
	return fract(sin(n) * 43758.5453123);
}

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453123);
}

float noise(float p){
	float fl = floor(p);
  	float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}
	
float noise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
  	vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}


float fbm (in vec2 st, in int oct) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < oct; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}