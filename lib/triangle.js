import {Transform} from './transform.js';
import { vec4, mat4 } from 'https://cdn.skypack.dev/gl-matrix';


export class Triangle
{
	constructor(X1,Y1,X2,Y2,X3,Y3,color,Z1,Z2,Z3)
	{
		Z1=0.0,Z2=0.0,Z3=0.0;
		this.coordinates = new Float32Array([
			//  x , y,  z 
			X1, Y1, Z1,X2, Y2, Z2,X3 ,Y3, Z3,]);
		
		
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
		let xm1 = this.coordinates[0];
		let xm2 = this.coordinates[0];
;
		let ym1 = this.coordinates[1];
		let ym2 = this.coordinates[1];
		let len = this.coordinates.length;

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

	
	// function to find centroid
	find_Centroid()
	{
		let sumx = (this.coordinates[0] + this.coordinates[3] + this.coordinates[6]);
		let sumy = (this.coordinates[1] + this.coordinates[4] + this.coordinates[7]);
		let sumz = (this.coordinates[2] + this.coordinates[5] + this.coordinates[8]);
		return [sumx/3, 
			sumy/3,
			sumz/3, ];
	}

	// will update the matrix
	modify_coordinates()
	{
		let center  = vec4.create();
		let matrix = this.transform.modelTransformMatrix;
		let len = this.coordinates.length;
		for(let j=0;j<len;j+=3)
		{
			vec4.set(center ,this.coordinates[j], this.coordinates[j+1], this.coordinates[j+2],1);
			// set the center variable (centroids)
			mat4.multiply(center ,matrix,center );

			// update the coordinates
			this.coordinates[j] = center [0];
			this.coordinates[j+1] = center [1];
			this.coordinates[j+2] = center [2];
		}

		// clear the tranformed matrix
		this.transform.clear_matrix();
	}

	// will update the centroid
	modifyCentroid()
	{
		let matrix = this.transform.modelTransformMatrix;
		// center  containing centroids
		let center  = vec4.create();
		
		// setting center  to the cooridnates
		let centroidArray = [this.Centroid[0], this.Centroid[1], this.Centroid[2], 1];
		
		vec4.set(center , centroidArray);
		// multiplying the transformed updated matrix by my centroid array 
		mat4.multiply(center , matrix, center );

		// assigning it to current latest centroid
		this.currCentroid[0] = center [0];
		this.currCentroid[1] = center [1];
		this.currCentroid[2] = center [2];	
	}

	
}