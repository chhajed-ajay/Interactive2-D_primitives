export class WebGLRenderer
{
	constructor()
	{
		this.domElement = document.createElement("canvas");		

		this.gl = this.domElement.getContext("webgl") || this.domElement.getContext("experimental-webgl");
		if (!this.gl) throw new Error("WebGL is not supported");

		this.setSize(50,50);
		this.clear(1.0,1.0,1.0,1.0);
	}	

	setSize(width, height)
	{
		this.domElement.width = width;
		this.domElement.height = height;
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	clear(r,g,b,a)
	{
		this.gl.clearColor(r, g, b, a);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}

	setAnimationLoop(animation) 
	{
		function renderLoop()
		{
			animation();
			window.requestAnimationFrame(renderLoop);
		}	

		renderLoop();
		  
	}

	getCanvas()
	{
		return this.domElement;
	}

	render(scene, shader) 
	{
		scene.primitives.forEach( function (primitive) {
			// primitive.transform.modifyTransformationMatrix();

			shader.bindArrayBuffer(shader.vertexAttributesBuffer, primitive.coordinates);
			shader.fillAttributeData("aPosition", primitive.coordinates, 3,  3 * primitive.coordinates.BYTES_PER_ELEMENT, 0);		
					
			shader.setUniform4f("uColor", primitive.color);
			const uMatrix = shader.uniform("uMatrix");
			shader.setUniformMatrix4fv(uMatrix, primitive.transform.modelTransformMatrix);
			// Draw
			shader.drawArrays(primitive.coordinates.length / 3);
		});
	}

	glContext()
	{
		return this.gl;
	}

	mouseToClipCoord(mouseX,mouseY) 
	{
		let can = this.domElement.getBoundingClientRect();
		mouseX = ((mouseX - can.left)/can.width)*2;
		mouseY = ((mouseY - can.top)/can.height)*2;
		mouseX-=1;
		mouseY-=1;
		// flipping the axis
		mouseY = (-1)*mouseY; // Coordinates in clip space
		let mouseCoordinates = [mouseX, mouseY];
		return mouseCoordinates;
	}
}