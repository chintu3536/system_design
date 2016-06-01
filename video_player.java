class video_player{
	LV_content lv_content;
	segment currSegment;
	int currIndex;
	
	public video_player(){
		lv_content = new LV_content();
	}
	
	public void play(){
		
	}
	
	public void pause(){
		
	}
	
	public void stop(){
		
	}
	
	public void replay(){
		
	}
	
	public void volume(){
		
	}
	
	public void Next_chapter(){
		currSegment=lv_content.Get_Next_Segment(currIndex);
		currIndex = currIndex+1;
	}
	
	public void GoTo_chapter(int x){
		currSegment=lv_content.Get_segment(x);
		currIndex = x;
	}
}