var x1,y1,x2,y2,ang, len;
for(var i = 0; i < this.amount; i++){
	// Angle
	ang = this.angle * i;

	// First circle
	dx1 = this.radius * Math.sin(this.angle * i);
	dy1 = this.radius * Math.cos(this.angle * i);

	// Second circle
	len = this.data[i] * this.lineL;
	dx2 = (this.radius + len) * Math.sin(this.angle * i);
	dy2 = (this.radius + len) * Math.cos(this.angle * i);

	// Draw
	this.context.beginPath();
	this.context.moveTo(this.canvas.width / 2 + dx1, this.canvas.height / 2 + dy1);

	this.context.lineTo(this.canvas.width / 2 + dx2, this.canvas.height / 2 + dy2);
	this.context.stroke();
}