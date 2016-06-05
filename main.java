import java.awt.BorderLayout;
import java.awt.Canvas;
import java.awt.Color;

import javax.swing.JFrame;
import javax.swing.JPanel;

//import uk.co.caprica.vlcj.binding.LibVlc;
import uk.co.caprica.vlcj.player.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.embedded.EmbeddedMediaPlayer;
//import uk.co.caprica.vlcj.runtime.RuntimeUtil;

//import com.sun.jna.Native;
//import com.sun.jna.NativeLibrary;

class main{
	public static void main(String args[]){
		/*String audio = "/home/chintu3536/system_design/audio/2.mp3";
		String image = "/home/chintu3536/system_design/images/2.png";
		Audio_Image a = new Audio_Image('0', audio, image);
		System.out.println(a.duration);
		
		LV_content vid = new LV_content();
		vid.Add_segment_at_position(a, 0);
		vid.Add_segment_at_end(a);
		System.out.print(vid.Get_Previous_Segment(1).duration+"\n");
		System.out.print(vid.duration);*/
		
		JFrame f = new JFrame();
		f.setLocation(100, 100);
		f.setSize(900, 700);
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		f.setVisible(true);
		
		Canvas c = new Canvas();
		c.setBackground(Color.black);
		
		JPanel p = new JPanel();
		p.setLayout(new BorderLayout());
		p.add(c);
		f.add(c);
			
		//NativeLibrary.addSearchPath(RuntimeUtil.getLibVlcLibraryName(), "lib");
		//Native.loadLibrary(RuntimeUtil.getLibVlcLibraryName(), LibVlc.class);
		
		MediaPlayerFactory mpf = new MediaPlayerFactory();
		EmbeddedMediaPlayer emp = mpf.newEmbeddedMediaPlayer();
		emp.setVideoSurface(mpf.newVideoSurface(c));
		emp.toggleFullScreen();
		emp.setEnableMouseInputHandling(false);
		emp.setEnableKeyInputHandling(false);
		String fil = "/home/chintu3536/system_design/videos/2.mp4";
		emp.prepareMedia(fil);
		emp.play();
		
		String fil2 = "/home/chintu3536/system_design/videos/1.mp4";
		emp.prepareMedia(fil2);
		emp.play();
	}
}