package playlists;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

@WebServlet("/pullvideos")
public class PullPlaylistVideos extends HttpServlet
{
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{		
		ObjectMapper mapper = new  ObjectMapper();
		PrintWriter out = resp.getWriter();
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
				
		System.out.println(req.getParameter("plid").toString());
		String PlId = req.getParameter("plid").toString();
		
		Query q = new Query("Video_data").addFilter("plid", FilterOperator.EQUAL, PlId);
//		System.out.println("The query is " + q);
		
		PreparedQuery p = ds.prepare(q);
//		System.out.println("The prepared query is " + p.toString());
		
		List<Entity> le1 = p.asList(FetchOptions.Builder.withLimit(500));
//		System.out.println("List le1 "  + le1);
//		Iterator<Entity> e = le1.iterator();
		
		
		List<VideoBean> vblist = new ArrayList<>();
		
		for(Entity e1 : p.asIterable())
		{
			VideoBean vb = new VideoBean();
			vb.setTitle(e1.getProperty("title").toString());
			vb.setPlid(e1.getProperty("plid").toString());
			vb.setImg(e1.getProperty("img").toString());
			vb.setVid(e1.getProperty("vid").toString());
			
			vblist.add(vb);
		}
		
		
		
		String jsondata = mapper.writeValueAsString(vblist);
		System.out.println(jsondata);
		
		out.print(jsondata);
		
	}
}
