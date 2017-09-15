/*
*	Initilize the audio stuff

	http://stackoverflow.com/questions/18215349/web-audio-api-mediaelementsource-node-and-soundcloud-not-working-with-effects
	
	https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
	
	It appears you forgot about the part where you connect the source with context.destination. 
	If you don't do this, the audio will appear to play but you won't hear anything.
	(This was rather infuriating for me.) I investigated your source code and found that.
	If your audio doesn't play, try doing this.
*/


// The song
var songPath = [""]; // <-- Insert strings with audio file paths
var songIndex = Math.round(Math.random()*songPath.length);

// Visualizer setup
var visualizer = new Visualizer(document.getElementById("canvas"));
var track = new Collector(songPath[songIndex], visualizer.read);
track.audio.play();


//track.play();
//track.pause();
//track.volume;
//track.loop;
//track.currentTime;
//track.duration;
