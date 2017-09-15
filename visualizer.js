/*
* 	Handle the canvas and the drawing
*/

function Visualizer(canvas){
	var self = this;
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");

	// Data
	this.MAX_VOLUME = 255; // The highest possible data input
	this.startTime = new Date().getTime();
	this.now = this.startTime;
	this.lastTime = this.now;
	this.deltaTime = null; // Time difference
	this.tempTime = null; // Used to set a temporary time

	// Visual
	this.amount = 120; // Amount of data points to render
	this.radius = 100; // Inner circle radius
	this.angle = 2*Math.PI / this.amount; // Calculating the angle between each point based on the amount
	this.peakCoverage = 0.9; // How much the visualizer should cover at max
	this.dataOffset = 0; // How high frequency before rendered visible
	this.startDataFreq = 0; // At which frequency it will start rendering from, 0 is the first
	this.resolution = 1; // The amount of notes to skip for each loop
	this.dataScale = 1; // Default value, will be set to fit screen

	// Dynamic variables
	this.angleSteps = 1500; // How many angle steps
	this.angleOffset = 0; // 0 - 2*PI
	this.angleIncrement = 2*Math.PI / this.angleSteps;
	
	// Set the resize event
	window.addEventListener("resize", function(){
		self.resize();
	});
	this.resize(); // Resize
	
	
	// Set the animation loop
	this.update = function(){
		this.now = new Date().getTime();
		this.deltaTime = this.now - this.lastTime;
		fps = 1000 / this.deltaTime; // (1 second / dt[seconds])
		console.log(fps);
		
		// Update
		self.draw();
		
		// Prepare for next update
		this.lastTime = this.now; // Now will be last time next update
		requestAnimationFrame(self.update); // Request another update
	}
	requestAnimationFrame(this.update);
	
	
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

Visualizer.prototype.offsetAngle = function(){
	this.angleOffset += this.angleIncrement; // Increment it
	if(this.angleOffset > 2*Math.PI){
		this.angleOffset -= 2*Math.PI; // Turn it back 360 degrees
	}
}

Visualizer.prototype.draw = function(){
	function Point(centerX, centerY, radius, length, angle){
		this.x1 = centerX + radius * Math.sin(angle);
		this.y1 = centerY + radius * Math.cos(angle);

		this.x2 = centerX + (radius + length) * Math.sin(angle);
		this.y2 = centerY + (radius + length) * Math.cos(angle);
	}

	// Rotate the entire thing, place this in controller function along with the draw call later and do it on request animation frame and use deltaTime
	this.offsetAngle();
	
	// Clean the canvas
	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

	// The curves
	this.context.fillStyle = "#222222";
	this.context.beginPath();
	var p = [], index = 0, d, dataIndex = this.startDataFreq;
	var waitingRound = true; // Skip incrementing the data index once
	for(var i = 0; i <= this.amount; i+=this.resolution){
		if(i >= this.amount/2){
			// Start going backwards on the indexes but not on the angles
			if(waitingRound){
				waitingRound = false;
			}
			else{
				dataIndex -= this.resolution;
			}
		}
		else{
			dataIndex = i;
		}

		// The data
		d = this.data[dataIndex]-this.dataOffset > 0?(this.data[dataIndex]-this.dataOffset)*this.dataScale:0;

		// controll points
		p.push( new Point(this.canvas.width/2, this.canvas.height/2, this.radius, d, this.angle*i + this.angleOffset) );

		// Draw
		this.context.lineTo(p[index].x2, p[index].y2);
		//this.context.fill();
		
		index++; // The index for the point
	}
	
	// Draw the closing line, It works when drawing to the second to last index.. why??!
	this.context.lineTo(p[p.length-2].x2, p[p.length-2].y2);
	
	// Render the drawing
	this.context.closePath();
	this.context.fill();
}


