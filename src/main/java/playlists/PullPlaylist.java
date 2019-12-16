package playlists;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.cloud.datastore.GqlQuery;

@WebServlet("/pullplaylist")
public class PullPlaylist extends HttpServlet{
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException
	{
		HttpSession newSess = req.getSession();
		ObjectMapper mapper = new  ObjectMapper();
		PrintWriter out = res.getWriter();
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
				
		String email = newSess.getAttribute("email").toString();
//		System.out.println(email);
		
		Query q = new Query("Playlist_data").addFilter("User_Id", FilterOperator.EQUAL, email);
//		System.out.println("The query is " + q);
		
		PreparedQuery p = ds.prepare(q);
//		System.out.println("The prepared query is " + p.toString());
		
		List<Entity> le1 = p.asList(FetchOptions.Builder.withLimit(500));
		System.out.print("List le1 "  + le1);
		
		Iterator<Entity> e = le1.iterator();
		List<PlaylistBean> pblist = new ArrayList<>();
		
		for(Entity e1 : p.asIterable())
		{
			PlaylistBean pb = new PlaylistBean();
			pb.setPl_title(e1.getProperty("Pl_Title").toString());
			pb.setPlId(e1.getProperty("PlId").toString());
			pb.setUser_Id(e1.getProperty("User_Id").toString());
			pb.setStatus(e1.getProperty("status").toString());
			
			pblist.add(pb);
		}
		
		String jsondata = mapper.writeValueAsString(pblist);
		System.out.println(jsondata);
		
		out.print(jsondata);
		
	}

}
