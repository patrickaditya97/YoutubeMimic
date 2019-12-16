import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;

@WebServlet("/datastore")
public class HelloAppEngine extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) 
      throws IOException {

	  DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
	  JavaBean jb = new JavaBean();
	  ObjectMapper om = new ObjectMapper();
	  PrintWriter pw = response.getWriter();
	  
	  Entity e1 = new Entity("user_old", UUID.randomUUID().toString());
	  
	  
	  e1.setProperty("empid", "emp123335");
	  e1.setProperty("empstat", "emp122");
	  
	  ds.put(e1);
	  
	  
//	  Query r = new Query("user_old").addFilter("empid", FilterOperator.EQUAL, "emp1345");
//	  PreparedQuery pq1 = ds.prepare(r);
//	  System.out.println(pq1);
//	  
//	  Iterable<Entity> userq = pq1.asIterable();
	  
	  
	  	Query q = new Query("user_old").addFilter("empid", FilterOperator.EQUAL, "emp123335");
		PreparedQuery pq = ds.prepare(q);
		List<Entity> pquser = pq.asList(FetchOptions.Builder.withLimit(100));
		System.out.println(pquser);
		
//		Entity employee = ds.get(aglub19hcHBfaWRyFQsSCHVzZXJfb2xkGICAgICAgLAIDA);
		
		Iterator<Entity> listit = pquser.iterator();
		List<JavaBean> string = new ArrayList<>();
				
//		while(listit.hasNext())
//		{
//			jb.setEmpid(listit.next().getProperty("empid").toString());
//			jb.setEmpstat(listit.next().getProperty("empstat").toString());
////			System.out.println(jb.getEmpid() + jb.getEmpstat());
////			string.add(listit.next().getProperties().toString());
//			string.add(jb);
//		}
		System.out.println(string);
		
	  String values = om.writeValueAsString(string);
	  System.out.println("json string "+values);
	  pw.print(values);
	  
	  JavaBean bean[] = om.readValue(values ,JavaBean[].class);
	  
	  System.out.println(jb.getEmpid());
//	  
//	  
//	  for(Entity user : pq1.asIterable())
//	  {
//		  String ages = user.getProperty("empid").toString();
//		  System.out.println(ages);
//	  }
	  
	  HttpSession sess = request.getSession();
	  sess.setAttribute("id_key", "32438423894809238423098");
	  System.out.println();
	  
	  response.setContentType("text/plain");
	  response.setCharacterEncoding("UTF-8");

	  response.getWriter().print("Hello App Engine!\r\n");

  }
}