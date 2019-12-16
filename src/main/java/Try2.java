import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;

@WebServlet("/try2")
public class Try2 extends HttpServlet{
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query("user_old").addFilter("empid", FilterOperator.EQUAL, "emp123335");
		
		PreparedQuery pq = ds.prepare(q);
		System.out.println(pq);
		
		List<Entity> pquser = pq.asList(FetchOptions.Builder.withLimit(100));
		System.out.println(pquser);
	}
	
}
