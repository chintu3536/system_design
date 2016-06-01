import java.util.Vector;

class LV_content{
	Vector<segment> segmentArray ;
	int numOfSegments;
	float duration;
	public LV_content(){
		numOfSegments = 0;
		duration = 0;
		segmentArray = new Vector<segment>(0);
	}
	
	public void Add_segment_at_end(segment seg){
		segmentArray.add(seg);
		numOfSegments+=1;
		duration += seg.duration;
		return;
	}
	
	public void Add_segment_at_position(segment seg, int x){
		if(x>=0 && x<=segmentArray.size()){
			segmentArray.add(x, seg);
			numOfSegments+=1;
			duration += seg.duration;
			return;
		}
		else{
			throw new IndexOutOfBoundsException("Array out of bound");
		}
	}
	
	public void Remove_Segment(int x){
		if(x>=0 && x<segmentArray.size()){
			duration -= segmentArray.get(x).duration;
			segmentArray.removeElementAt(x);
			numOfSegments-=1;
			return;
		}
		else{
			throw new IndexOutOfBoundsException("Array out of bound");
		}
	}
	
	public segment Get_Next_Segment(int x){
		if(x>=0 && x<segmentArray.size()-1){
			return segmentArray.get(x+1);
		}
		else{
			throw new IndexOutOfBoundsException("Array out of bound");
		}
	}
	
	public segment Get_Previous_Segment(int x){
		if(x>0 && x<segmentArray.size()){
			return segmentArray.get(x-1);
		}
		else{
			throw new IndexOutOfBoundsException("Array out of bound");
		}
	}
	
	public segment First_Segment(){
		return segmentArray.get(0);
	}
	
	public segment Get_segment(int x){
		return segmentArray.get(x);
	}
	
}