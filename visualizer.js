/*
* 	Handle the canvas and the drawing
*/

function Visualizer(canvas){
	var self = this;
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");

	// Data
	this.MAX_VOLUME = 255; // The highest possible data input

	// Visual
	this.amount = 100; // Amount of data points to render
	this.radius = 100; // Inner circle radius
	this.angle = 2*Math.PI / this.amount; // Calculating the angle between each point based on the amount
	this.peakCoverage = 0.9; // How much the visualizer should cover at max
	this.dataOffset = 10; // How high frequency before rendered visible
	this.resolution = 1; // The amount of notes to skip for each loop
	this.dataScale = 1; // Default value, will be set to fit screen

	// Set the resize event
	window.addEventListener("resize", function(){
		self.resize();
	});
	this.resize(); // Resize
	
	// Set the animation loop
	setInterval(function(){
		self.draw();
	}, 1000 / 60);

	// Collect the data
	this.read = function(frequency){
		self.data = frequency;
	}
}

Visualizer.prototype.resize = function(){
	this.canvas.width = this.canvas.parentElement.offsetWidth;
	this.canvas.height = this.canvas.parentElement.offsetHeight;

	// Get the scaling to make it fit in the screen
	// (MAX_VOLUME-offset)*scale + radius = WorH / 2 * desiredPercentageConverage
	this.dataScale = (Math.min(this.canvas.width, this.canvas.height)/2 * this.peakCoverage - this.radius) / (this.MAX_VOLUME - this.dataOffset);
}

Visualizer.prototype.draw = function(){
	function Point(centerX, centerY, radius, length, angle){
		this.x1 = centerX + radius * Math.sin(angle);
		this.y1 = centerY + radius * Math.cos(angle);

		this.x2 = centerX + (radius + length) * Math.sin(angle);
		this.y2 = centerY + (radius + length) * Math.cos(angle);
	}

	// Clean the canvas
	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

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
}


