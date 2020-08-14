/**
 * Attempt to get the GL context of the canvas
 * @param {string} id - Canvas html id
 */
export function getGl(id) {
    const canvas = document.querySelector(`#${id}`);
    const gl = canvas.getContext('webgl');
    if (gl === null) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        throw Error('Unable to get gl');
    }
    return gl;
}

/**
 * Initialize a shader program, so WebGL knows how to draw our data
 * @param {*} gl - GL context
 * @param {string} vsSource - Vertex Shader Source
 * @param {string} fsSource - Fragment Shader Source
 */
export function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

/**
 * creates a shader of the given type, uploads the source and compiles it.
 * @param {*} gl - GL context
 * @param {*} type - Type of shader
 * @param {string} fsSource - Fragment Shader Source
 */
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}
