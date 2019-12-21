package com.ytmimic;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;


@WebServlet("/login")
public class LoginServlet extends HttpServlet
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public void service(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException
	{
		System.out.println("Hello ");
		
		HttpSession newSess = req.getSession();
		System.out.println();
    	System.out.println("login "+ newSess);
    	System.out.println();
		
    	System.out.println(req.getParameter("id") + "---" +req.getParameter("name") + "---" + req.getParameter("img") + "---" + req.getParameter("email") );
    	
    	newSess.setAttribute("id", req.getParameter("id"));
    	newSess.setAttribute("name", req.getParameter("name"));
    	newSess.setAttribute("img", req.getParameter("img"));
    	newSess.setAttribute("email", req.getParameter("email"));
		
    	
		System.out.println(newSess.getAttribute("id") + "---" + newSess.getAttribute("name") + "---" + newSess.getAttribute("img") + "---" + newSess.getAttribute("email") );

		
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
					
		Entity e = new Entity("User_data" , newSess.getAttribute("email").toString());
		
		e.setProperty("name", newSess.getAttribute("name"));
		e.setProperty("email", newSess.getAttribute("email"));
		
		Timestamp timestamp1 = new Timestamp(System.currentTimeMillis());
		e.setProperty("created_at", timestamp1.toString());
		
		e.setProperty("Status", 1);
		
		ds.put(e);
		
		res.sendRedirect("/Home.html");
	}
}
