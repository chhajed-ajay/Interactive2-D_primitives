export class Scene
{
	constructor()
	{
		this.primitives = []
	}

	add(primitive)
	{
		if( this.primitives && primitive )
		{
			this.primitives.push(primitive)
		}
	}

	clear()
	{
		this.primitives = []
	}

	Centroid()
	{
		// @ToDo : Return the Centroid as per the requirements of mode-2
	}
}
