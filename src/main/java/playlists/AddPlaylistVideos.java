package playlists;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

@WebServlet("/addvideos")
public class AddPlaylistVideos extends HttpServlet
{
	public void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		HttpSession sess = req.getSession();
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Entity video = new Entity("Video_data");
		PrintWriter out = res.getWriter();
		
		String title = req.getParameter("title");
		String plid = req.getParameter("plid");
		String vid = req.getParameter("vid");
		String img = req.getParameter("img");
		int hashcode = (title+plid+vid+img).hashCode();
		
		video.setProperty("title", title);
		video.setProperty("vid", vid);
		video.setProperty("plid", plid);
		video.setProperty("img", img);
		video.setProperty("uniquecode", UUID.randomUUID().toString().replace('-', 'b'));
		
		ds.put(video);
	}
	
	
}
