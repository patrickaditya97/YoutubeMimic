package playlists;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;

@WebServlet("/deletevideos")
public class DeleteVideos extends HttpServlet
{
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
//		System.out.println(req.getParameter("ucode"));
		
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query("Video_data").addFilter("uniquecode", FilterOperator.EQUAL, req.getParameter("ucode"));
		
		PreparedQuery pq = ds.prepare(q);
		
		for(Entity e : pq.asIterable())
		{
//			System.out.println(e.getKey());
			
			ds.delete(e.getKey());
			
		}
		
	}
}
