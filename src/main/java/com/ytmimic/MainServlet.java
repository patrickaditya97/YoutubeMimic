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


@WebServlet("/app")
public class MainServlet extends HttpServlet 
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
	{
		
		HttpSession sess = req.getSession(false);
		
		PrintWriter out = res.getWriter();
		System.out.println();
		System.out.println(sess);
		System.out.println();
		
		if(sess.getAttribute("email") == null)
		{
			System.out.println("its null at main");
			System.out.println();
			
			RequestDispatcher rd = req.getRequestDispatcher("/Home.html");
			rd.forward(req, res);
			

//			res.sendRedirect("/Home.html");
		}
		else 
		{
			System.out.println(sess);
			System.out.println("at Main " + sess.getAttribute("email"));
			System.out.println();
			
//			out.print(sess.getAttribute("email"));

			RequestDispatcher rd = req.getRequestDispatcher("/Home.html");
			rd.forward(req, res);

//			res.sendRedirect("/home");
			
		}
		
	}
}
