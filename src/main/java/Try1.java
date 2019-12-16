import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

@WebServlet("/try1")
public class Try1 extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Entity e1 = new Entity("user_old", UUID.randomUUID().toString());
		
		e1.setProperty("empid", "emp123335");
		e1.setProperty("empstat", "emp122");
		  
		ds.put(e1);
		
	}
	
	
	
}
