package com.ytmimic;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/checkSession")
public class SessionCheck extends HttpServlet
{
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException
	{
		HttpSession session = req.getSession();
		PrintWriter out = res.getWriter();
		
		if(session.getAttribute("email") != null)
		{
			System.out.println("true");
			out.print(true);
		}
		else
		{
			System.out.println("false");
			out.print(false);
		}
	}
}
