package com.tok.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tok.dao.ClipDao;
import com.tok.dao.ClipDaoWithCaching;
public class ClipCachedHandler extends HttpServlet{

	private static final long serialVersionUID = 1L;
    //private static String INSERT_OR_EDIT = "/user.jsp";
    private static String LIST_Articles = "/listArticles.jsp";
    private ClipDaoWithCaching dao = null;

    public ClipCachedHandler() {
        super();
        dao = new ClipDaoWithCaching();//new ClipDao();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String forward="";
        String action = request.getParameter("action");
        String slotID = request.getParameter("slotID");
        dao.setSlotId(Integer.parseInt(slotID));
       // if (action.equalsIgnoreCase("listArticles")){
            forward = LIST_Articles;
            request.setAttribute("clips", dao.getClipsViaArray());
       // } 

        RequestDispatcher view = request.getRequestDispatcher(forward);
        view.forward(request, response);
    }
}