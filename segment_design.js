// Line 10


//	Segment contains type, timeSrc, duration
//	timeSrc is the file src whose duration is considered as the segment duration
function segment(type, timeSrc){
	this.type = type;
	this.timeSrc = timeSrc;
	this.FindDuration = function(){
		//	needs modification
		this.duration = this.timeSrc;
	}
}

// 	Audio_Image is a segment inherited from segment
// 	This has AudioSrc and ImageSrc as extra elements
function Audio_Image(type, audio, image){	

	//	creating an array whose elements are the arguments to segment constructor
	//	apply function accepts only array as argument
	var array = [type, audio];

	//	Inheriting from segment 
	//	array is the argumnets to the constructor of segment
	segment.apply(this, array);

	//	AudioSrc and ImageSrc are initialised
	this.AudioSrc = audio;
	this.ImageSrc = image;

	//	This calls the FindDuration() of parent(segment) and assigns duration
	this.FindDuration();
}

function Video(type, video){

	//	creating an array whose elements are the arguments to segment constructor (type and timeSrc)
	//	apply function accepts only array as argument
	var array = [type, video];

	//	Inheriting from segment 
	//	array is the argumnets to the constructor of segment
	segment.apply(this, array);

	//	VideoSrc is initialised
	this.VideoSrc = video;

	//	This calls the FindDuration() of parent(segment) and assigns duration
	this.FindDuration();
}