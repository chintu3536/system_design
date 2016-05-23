class segment{
	constructor(Type, start_time, end_time){
		this.Type = Type;
		this.start_time = start_time;
		this.end_time = end_time;
		this.State = "stop";
		if(Type == 0){
			this.VideoSrc = arguments[3]; 
			this.VideoType = arguments[4];
		}
		if(Type == 1){
			this.AudioSrc = arguments[3];
			this.ImgSrc = arguments[4];
		}
	}
	start(){
		this.State = "play";
		if(this.Type == 0){
			this.video = document.createElement("VIDEO");
			this.video.src = this.VideoSrc;
			this.video.type = this.VideoType;
			this.video.play();
		}
		if(this.Type == 1){
			this.image = document.createElement("IMG");	
			this.image.src = this.ImgSrc;

			this.audio = document.createElement("AUDIO");
			this.audio.src = this.AudioSrc;
			this.audio.play();
		}
	}

	pause(){
		this.State = "pause";
		if(this.Type == 0){
			this.video.pause();
		}
		if(this.Type == 1){
			this.audio.pause();
		}
	}

	resume(){
		this.State = "play";
		if(this.Type == 0){
			this.video.play();
		}
		if(this.Type == 1){
			this.audio.play();
		}
	}

	status(){
		return this.State;
	}
}

class video{
	constructor(){
		this.SegmentNumber = -1;
		this.Segment = [];
	}
	changeCurrentSegment(segment){
		this.CurrentSegment = segment;
		this.SegmentNumber +=1;
		this.timeleft = this.CurrentSegment.end_time-this.CurrentSegment.start_time;
	}
	getCurrentSegment(){
		return this.CurrentSegment;
	}
}		

var inp;
var Segment;
var Video= new video();
var display='display';
var text = 'text';

function createSegment(i){
	if(inp[i].type == 0){
		Segment = new segment(inp[i].type, inp[i].start, inp[i].end, inp[i].src.video, inp[i].src.type);
	}
	if(inp[i].type == 1){
		Segment = new segment(inp[i].type, inp[i].start, inp[i].end, inp[i].src.audio, inp[i].src.img);
	}
	return Segment;
}

function StartNextSegment(){
	setTimeout(function(){
		Video.changeCurrentSegment(Video.Segment[Video.SegmentNumber+1]);
		play_pause();
		}, 
		Video.timeleft*1000);
	var t=new Date().getTime();
	while(true){
		if(video.CurrentSegment.State == "pause"){
			t =  new Date().getTime() - t;
			Video.timeleft = Video.timeleft - t;
			return;
		}
	}
}

function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) { 
    inp = event.target.result;
    inp=JSON.parse(inp);
    for(var i=0;i<inp.length;i++){
    	Video.Segment[i] = createSegment(i);
    }
    Video.changeCurrentSegment(Video.Segment[0]);
  };
  reader.readAsText(file);  
}


function play_pause(){
	Segment = Video.getCurrentSegment();
	if(Segment.State == "stop"){
		Segment.start();
		if(Segment.Type == 0){
			document.getElementById(display).replaceChild(Segment.video, document.getElementById(display).childNodes[0]);
		}
		if(Segment.Type == 1){
			document.getElementById(display).replaceChild(Segment.image, document.getElementById(display).childNodes[0]);
		}
		document.getElementById(display).removeChild(document.getElementById(display).childNodes[1]);
		StartNextSegment();
	}
	else if(Segment.State == "pause"){
		Segment.resume();
		StartNextSegment();
	}
	else if(Segment.State == "play"){
		Segment.pause();
	}
}

