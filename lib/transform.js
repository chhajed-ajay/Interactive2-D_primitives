import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export class Transform
{
	constructor()
	{
		this.translate = vec3.create();
		vec3.set(this.translate, 0, 0, 0);
		
		this.scale = vec3.create();
		vec3.set(this.scale, 1, 1, 1);
		
		this.rotationAngle = 0;
		this.rotationAxis = vec3.create();
		vec3.set(this.rotationAxis, 0, 0, 1);

		this.modelTransformMatrix = mat4.create();
		mat4.identity(this.modelTransformMatrix);
	}

	modifyTransformationMatrix(type = 't',deltaX=0,deltaY=0,deltaZ=0, c=[0,0,0])
	{
		// @ToDO
		// 1. Reset the transformation matrix
		// 2. Use the current transformations values to calculate the latest transformation matrix

			if(type == 's'){
				this.scale[0] = deltaX;
				this.scale[1] = deltaY;
				this.scale[2] = deltaZ;
			
				this.modifyTransformationMatrix('t',c[0],c[1],c[2]);

				mat4.scale(this.modelTransformMatrix, this.modelTransformMatrix, this.scale);
				this.modifyTransformationMatrix('t',-c[0],-c[1],-c[2]);
			}
			else if(type === 't'){
				this.translate[0] = deltaX;
				this.translate[1] = deltaY;
				this.translate[2] = deltaZ;
				mat4.translate(this.modelTransformMatrix, this.modelTransformMatrix, this.translate);
			}
			else if(type === 'r'){
				this.modifyTransformationMatrix('t',c[0],c[1],c[2]);
				mat4.rotate(this.modelTransformMatrix, this.modelTransformMatrix, deltaX, this.rotationAxis);
				this.modifyTransformationMatrix('t',-c[0],-c[1],-c[2]);
			}
			
	}

	// clear matrix
	clear_matrix()
	{
		// make it an identity matrix
		mat4.identity(this.modelTransformMatrix); 
	}
}