var text = 'text';	

class segment{
	constructor(Type){
		this.Type = Type;
		this.State = "stop";
		this.duration =0;
		if(Type == 0){
			this.VideoSrc = arguments[1]; 
		}
		if(Type == 1){
			this.AudioSrc = arguments[1];
			this.ImgSrc = arguments[2];
		}
	}
	start(){
		this.State = "play";	
		if(this.Type == 0){
			this.video = document.createElement("VIDEO");
			this.video.src = this.VideoSrc;		
			this.video.load();
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
		this.timeleft=0;
		this.numOfSegments =0;
	}
	changeCurrentSegment(segment){
		this.CurrentSegment = segment;
		this.SegmentNumber +=1;
	}
	getCurrentSegment(){
		return this.CurrentSegment;
	}
	reset(){
		this.SegmentNumber=0;
		this.timeleft=0;
	}
}		

var inp;
var Segment;
var Video= new video();
var display='display';

function createSegment(i){
	if(inp[i].type == 0){
		Segment = new segment(inp[i].type, inp[i].src.video, inp[i].src.type);
	}
	if(inp[i].type == 1){
		Segment = new segment(inp[i].type, inp[i].src.audio, inp[i].src.img);
	}
	return Segment;
}

function StartNextSegment(){
	var timeOUT = setTimeout(function(){
		if(Video.SegmentNumber < Video.numOfSegments-1)
		{
			Video.CurrentSegment.State = "stop";
			Video.changeCurrentSegment(Video.Segment[Video.SegmentNumber+1]);
			play_pause();
		}
		else{
			Video.CurrentSegment.State = "stop";
			Video.changeCurrentSegment(Video.Segment[0]);
			Video.reset();
		}
		}, 
		Video.timeleft);
	var t=new Date().getTime();
	function wait(){
		if(Video.CurrentSegment.State != "pause"){
			setTimeout(wait, 100)
		}
		else{
			t =  new Date().getTime() - t;
			Video.timeleft = Video.timeleft - t;
			clearTimeout(timeOUT);
			return;
		}
	}
	wait();
}

function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) { 
    inp = event.target.result;
    inp=JSON.parse(inp);
    Video.numOfSegments = inp.length;
    for(var i=0;i<inp.length;i++){
    	Video.Segment[i] = createSegment(i);
    }
    Video.changeCurrentSegment(Video.Segment[0]);
  };
  reader.readAsText(file);  
}


function play_pause(){
	Segment = Video.CurrentSegment;
	if(Segment.State == "stop"){
		Segment.start();
		if(Segment.Type == 0){
			document.getElementById(display).replaceChild(Segment.video, document.getElementById(display).childNodes[0]);
			var myVideoPlayer = document.getElementById(display).childNodes[0];
			myVideoPlayer.addEventListener('loadedmetadata', function () {
			    Segment.duration = myVideoPlayer.duration;
			    Video.timeleft = Segment.duration*1000;
			    StartNextSegment();
			 });
		}
		if(Segment.Type == 1){
			document.getElementById(display).replaceChild(Segment.image, document.getElementById(display).childNodes[0]);
			Segment.audio.addEventListener('loadedmetadata',function(){
				Segment.duration = this.duration;
				Video.timeleft = Segment.duration*1000;
				StartNextSegment();
			});
		}
		document.getElementById(display).removeChild(document.getElementById(display).childNodes[1]);
	}
	else if(Segment.State == "pause"){
		document.getElementById('play').innerHTML = '&#9658';
		Segment.resume();
		StartNextSegment();
	}
	else if(Segment.State == "play"){
		document.getElementById('play').innerHTML = '&#9614'+'&#9614';
		Segment.pause();
	}
}