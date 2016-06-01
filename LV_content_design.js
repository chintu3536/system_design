function LV_content(){
	this.segmentArray = [];
	this.numOfSegments = 0;
	this.duration = 0;


	//	seg is the segment to be added
	this.Add_segment_at_end = function(seg){

		// At the array end, remove nothing and add seg
		this.segmentArray.splice(this.segmentArray.length, 0, seg);
		this.numOfSegments = this.numOfSegments+1;
		this.duration = this.duration+seg.duration;
	}


	//	x is 0 index based
	// 	seg is the segment to be added
	this.Add_segment_at_position = function(x, seg){
		if(x>=0 && x<=this.segmentArray.length-1){

			// 	At position x, remove zero elements and add seg
			this.segmentArray.splice(x, 0, seg);
			this.numOfSegments = this.numOfSegments+1;
			this.duration = this.duration+seg.duration;
		}
		else{

		}
	}

	//	x is 0 index based
	this.Remove_segment = function(x){
		if( x>=0 && x<=this.segmentArray.length-1){	

			this.duration = this.duration-this.segmentArray[x].duration;

			// 	At position x, remove 1 element and add nothing	
			this.segmentArray.splice(x, 1);
			this.numOfSegments = this.numOfSegments-1;
		}
		else{

		}
	}

	//	x is the current segment index
	this.GetNextSegment = function(x){

		// Index should be less than final index, to have the next element
		if(x<this.segmentArray.length-1){
			return this.segmentArray[x+1];
		}
		else{

		}
	}

	// 	x is the current segment index
	this.GetPreviousSegment = function(x){
		if(x>0){
			return this.segmentArray[x-1];
		}
		else{

		}
	}

	this.first_segment = function(){
		return this.segmentArray[0];
	}

	this.FindPosition = function(seg){
		for(int i=0;i<this.segmentArray.length;i++){
			if(this.segmentArray[i] == seg){
				return i;
			}
		}
		if(i==this.segmentArray.length){
			return -1;
		}
	}

	//	x is 0 based index 
	this.GetSegment = function(x){
		if(x>=0 && x<=this.segmentArray.length-1){
			return this.segmentArray[x];
		}
	}
}