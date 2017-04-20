// Update visuals (in the resize event)
this.lineW = Math.ceil(this.canvas.width / this.amount);

for(var i = 0; i < this.amount; i++){
		//this.context.fillRect(this.lineW * i, (canvas.height/3*2) - this.data[i]*1.5, this.lineW, this.data[i]*1.5);
		this.context.fillRect(this.lineW * i, canvas.height - this.data[i]*3, this.lineW, this.data[i]*3);
	}
this.context.stroke();