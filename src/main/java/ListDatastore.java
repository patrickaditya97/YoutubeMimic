import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

@WebServlet("/listds")
public class ListDatastore extends HttpServlet
{
	public void doGet(HttpServletRequest req, HttpServletResponse res)
	{
		HttpSession session = req.getSession();
		
		System.out.println(session.getAttribute("id_key"));
		
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		
		Entity e = new Entity("user_data", session.getAttribute("id_key").toString());
		
		e.setProperty("name", "patrick");
		e.setProperty("email", "mpatrick97@gmail.com");
		
		List<String> PlId = new ArrayList<String>();
		
		e.setProperty("PlId", PlId);
		
		ds.put(e);
		
		Key key = KeyFactory.createKey("user_data", "32438423894809238423098");
				
		try {
			System.out.println(ds.get(key));
		} catch (EntityNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		PlId.add("hello");
		PlId.add("hello");
		
		e.setProperty("PlId", PlId);
		
		ds.put(e);
		
		List<String> retplid = null;
		try {
			retplid = (List<String>) ds.get(key).getProperty("PlId");
		} catch (EntityNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		Iterator<String> it = retplid.iterator();
		
		while(it.hasNext())
		{
			System.out.println(it.next());
		}
		
		try {
			System.out.println(ds.get(key));
		} catch (EntityNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
	}
}
