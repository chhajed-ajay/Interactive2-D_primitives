import {Transform} from './transform.js';
import { vec4, mat4 } from 'https://cdn.skypack.dev/gl-matrix';


export class Quadrilateral
{
	constructor(X1,Y1,X2,Y2,X3,Y3,X4,Y4, color, Z1=0.0,Z2=0.0,Z3=0.0,Z4=0.0)
	{

		this.coordinates2 = new Float32Array(18).fill(0.0);
		this.coordinates = new Float32Array([
			//  x , y,  z 
			X1, Y1, Z1,
			X2, Y2, Z2,
			X3 ,Y3, Z3,
			X4, Y4, Z4,
			X1, Y1, Z1,
			X3 ,Y3, Z3,
		]);	


		this.transform = new Transform();
		
		// assigning color 
		this.color = color;

		
		// initialise centroid array
		this.currCentroid = new Array(3);

		// finding Centroid 
		this.Centroid = this.find_Centroid();
		
		// current Centroid(s)
		this.currCentroid[0] = this.Centroid[0];
		this.currCentroid[1] = this.Centroid[1];
		this.currCentroid[2] = this.Centroid[2];

		// extremas 
		[this.xm2, this.xm1, this.ym2, this.ym1] = this.extremums();
	}
	
	extremums()
	{
		let len = this.coordinates.length;
		let xm1 = this.coordinates[0], xm2 = this.coordinates[0];
		let ym1 = this.coordinates[1], ym2 = this.coordinates[1];

		for(let i=3;i<len;i+=3)
		{
			xm1 = Math.min(xm1, this.coordinates[i]);
			xm2 = Math.max(xm2, this.coordinates[i]);
		}
		for(let i=4;i<len;i+=3)
		{
			ym1 = Math.min(ym1, this.coordinates[i]);
			ym2 = Math.max(ym2, this.coordinates[i]);
		}
		let extremas = [xm2, xm1, ym2, ym1];
		
		// return all the extremums, minimum x, maximum x
		// minimum y. maximum y
		return extremas;
	}

	find_Centroid()
	{
		let sumx = (this.coordinates[0] + this.coordinates[3] + this.coordinates[6] + this.coordinates[9]);
		let sumy = (this.coordinates[1] + this.coordinates[4] + this.coordinates[7] + this.coordinates[10]);
		let sumz = (this.coordinates[2] + this.coordinates[5] + this.coordinates[8] + this.coordinates[11]);
		return [sumx/4, 
			sumy/4,
			sumz/4, ];
	}

	modify_coordinates()
	{
		let matrix = this.transform.modelTransformMatrix;
		// console.log(matrix);
		let point = vec4.create();
		// console.log(this.coordinates);
		for(let i=0;i<this.coordinates.length;i+=3)
		{
			vec4.set(point,this.coordinates[i], this.coordinates[i+1], this.coordinates[i+2],1);
			// point = new Float32Array([this.coordinates[i], this.coordinates[i+1], this.coordinates[i+2],1]);
			mat4.multiply(point,matrix,point);
			this.coordinates[i] = point[0];
			this.coordinates[i+1] = point[1];
			this.coordinates[i+2] = point[2];
		}
		// console.log(this.coordinates);
		this.transform.clear_matrix();
	}

	
	modifyCentroid()
	{
		let matrix = this.transform.modelTransformMatrix;
		let point = vec4.create()
		vec4.set(point, this.Centroid[0], this.Centroid[1], this.Centroid[2], 1);
		mat4.multiply(point, matrix, point);
		this.currCentroid[0] = point[0];
		this.currCentroid[1] = point[1];
		this.currCentroid[2] = point[2];	
	}


	
}