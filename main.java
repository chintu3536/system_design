import java.io.File;

class main{
	public static void main(String args[]){
		String audio = "/home/chintu3536/system_design/audio/2.mp3";
		String image = "/home/chintu3536/system_design/images/2.png";
		Audio_Image a = new Audio_Image('0', audio, image);
		System.out.println(a.duration);
		
		LV_content vid = new LV_content();
		vid.Add_segment_at_position(a, 0);
		vid.Add_segment_at_end(a);
		System.out.print(vid.Get_Previous_Segment(1).duration+"\n");
		System.out.print(vid.duration);
	}
}