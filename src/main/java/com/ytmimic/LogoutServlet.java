package com.ytmimic;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void  service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
	{        
		HttpSession session = req.getSession(false);
		
		session.invalidate();
		session.setMaxInactiveInterval(0);
		
		if(req.getSession().getAttribute("email") == null)
		{
			System.out.println("nulled " + req.getSession(false));
		}
		System.out.println("Logout done");
		
		req.getRequestDispatcher("/Home.html").include(req, res);
		
//		res.sendRedirect("/app");
		
		
//        if(req.getSession(false) != null){
//        	
//        	System.out.println("not null");
//        	
//            session.removeAttribute("id");
//            session.removeAttribute("name");
//            session.removeAttribute("img");
//            session.removeAttribute("email");
//            session.invalidate();
//            
////            System.out.println(session.getAttribute("id"));
//            
//           res.sendRedirect("/app");
//
//        }
//        res.sendRedirect(req.getContextPath() + "/loginPage");       
        
	}
}
