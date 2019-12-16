package playlists;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.RequestDispatcher;
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
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;


@WebServlet("/newplaylist")
public class NewPlaylist extends HttpServlet
{
	public void service(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException
	{
		HttpSession newSess = req.getSession();
		PrintWriter out = res.getWriter();
		RequestDispatcher rd = req.getRequestDispatcher("/pullplaylist");
		
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Entity e = new Entity("Playlist_data", "a" + UUID.randomUUID().toString());
		
		e.setProperty("User_Id", newSess.getAttribute("email"));
		e.setProperty("PlId", UUID.randomUUID().toString());
		e.setProperty("Pl_Title", req.getParameter("title"));
		e.setProperty("status", 1);
		
		ds.put(e);
		
//		out.print("Success....");
		
		rd.include(req, res);
	}	
}
