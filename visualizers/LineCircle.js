function Point(centerX, centerY, radius, length, angle){
	this.x1 = centerX + radius * Math.sin(angle);
	this.y1 = centerY + radius * Math.cos(angle);

	this.x2 = centerX + (radius + length) * Math.sin(angle);
	this.y2 = centerY + (radius + length) * Math.cos(angle);
}

// The curves
this.context.fillStyle = "#222222";
this.context.beginPath();
var p,d,index;
for(var i = 0; i < this.amount; i+=this.resolution){
	if(i >= this.amount/2){
		// Start going backwards on the indexes but not on the angles
		index -= this.resolution;
	}
	else{
		index = i;
	}

	// The data
	d = this.data[index]-this.dataOffset > 0?(this.data[index]-this.dataOffset)*this.dataScale:0;

	// controll points
	p = new Point(this.canvas.width/2, this.canvas.height/2, this.radius, d, this.angle*(i));

	// Draw
	this.context.lineTo(p.x2,p.y2);
	this.context.fill();
}
this.context.closePath();