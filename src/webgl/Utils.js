export function getGl(id) {
    const canvas = document.querySelector(`#${id}`);
    const gl = canvas.getContext('webgl');
    if (gl === null) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        throw Error('Unable to get gl');
    }
    return gl;
}
