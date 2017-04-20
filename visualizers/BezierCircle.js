function Point(centerX, centerY, radius, length, angle){
	this.x1 = centerX + radius * Math.sin(angle);
	this.y1 = centerY + radius * Math.cos(angle);

	this.x2 = centerX + (radius + length) * Math.sin(angle);
	this.y2 = centerY + (radius + length) * Math.cos(angle);
}

// Connect the start and finish
var secondPoint = new Point(this.canvas.width/2, this.canvas.height/2, this.radius, this.data[1], this.angle);
var firstPoint = new Point(this.canvas.width/2, this.canvas.height/2, this.radius, this.data[0], 0);
var lastPoint = new Point(this.canvas.width/2, this.canvas.height/2, this.radius, this.data[this.amount-1], this.angle*(this.amount-1));
this.context.beginPath();
this.context.bezierCurveTo(lastPoint.x2,lastPoint.y2, firstPoint.x2,firstPoint.y2, secondPoint.x2,secondPoint.y2);
this.context.stroke();


// The curves
this.context.fillStyle = "#222222";
this.context.beginPath();
var d1,d2,d3,p1,p2,p3;
for(var i = 0; i < this.amount; i+=3){
	
	// The data
	d1 = this.data[i]-this.dataOffset > 0?(this.data[i]-this.dataOffset)*this.dataScale:0;
	d2 = this.data[i+1]-this.dataOffset > 0?(this.data[i+1]-this.dataOffset)*this.dataScale:0;
	d3 = this.data[i+2]-this.dataOffset > 0?(this.data[i+2]-this.dataOffset)*this.dataScale:0;

	// controll points
	p1 = new Point(this.canvas.width/2, this.canvas.height/2, this.radius, d1, this.angle*(i));
	p2 = new Point(this.canvas.width/2, this.canvas.height/2, this.radius, d2, this.angle*(i+1));
	p3 = new Point(this.canvas.width/2, this.canvas.height/2, this.radius, d3, this.angle*(i+2));

	// Draw
	//this.context.beginPath();
	this.context.bezierCurveTo(p1.x2,p1.y2, p2.x2,p2.y2, p3.x2,p3.y2);
	//this.context.stroke();
	this.context.fill();
}
this.context.closePath();
