import java.io.File;
//import com.xuggle.xuggler.IContainer;


class segment{
	char type;
	float duration;
	
	public segment(char inp_type){
		type = inp_type;
		duration = 0;
	}
	
	public void GetDuration(String file ){
		String filename = file;
		/*IContainer container = IContainer.make();
		int result = container.open(filename, IContainer.Type.READ, null);
		long duration = container.getDuration();
		long fileSize = container.getFileSize();*/
	}
}

class Audio_Image extends segment{	
	String AudioSrc,ImageSrc;
	public Audio_Image(char type, String audio, String image){
		super(type);
		AudioSrc = audio;
		ImageSrc = image;
		this.GetDuration(audio);
	}
}

class Video extends segment{
	File VideoSrc;
	public Video(char type, File video){
		super(type);
		VideoSrc = video;
	}
}

