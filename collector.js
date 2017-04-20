/*
* 	Class that will collect the audio source
*	from given audio file and provide it in a callback
*/

function Collector(path, callback = function(){}){
	// Set it up
	this.audio = new Audio(path); // The html5 element
	this.callback = callback;
	//this.audio.play();

	this.context = new AudioContext();
	this.source = this.context.createMediaElementSource(this.audio);

	this.analyser = this.context.createAnalyser();
	// we have to connect the MediaElementSource with the analyser 
	this.source.connect(this.analyser);
	this.source.connect(this.context.destination);
	// we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
 
	// frequencyBinCount tells you how many values you'll receive from the analyser
	this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

	// we're ready to receive some data!
	// loop
	var self = this;
	function renderFrame() {
	    requestAnimationFrame(renderFrame);
   		// update data in frequencyData
    	self.analyser.getByteFrequencyData(self.frequencyData);
    	self.callback(self.frequencyData);
    	// render frame based on values in frequencyData
   		//console.log(self.frequencyData)
	}
	renderFrame();
}