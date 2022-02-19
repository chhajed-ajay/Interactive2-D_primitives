export const vertexShaderSrc = `      
	attribute vec3 aPosition;
	uniform mat4 uMatrix;
	void main () {        
		gl_Position = uMatrix*vec4(aPosition,1.0);
	}
`;