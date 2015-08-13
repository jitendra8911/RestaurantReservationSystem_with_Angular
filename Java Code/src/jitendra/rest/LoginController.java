package jitendra.rest;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import jitendra.dao.AdminDAO;
import jitendra.exceptions.AppException;
import jitendra.model.AdminDetails;
@Path("/admin")
public class LoginController {
	
	@POST
	@Path("/authenticate")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse authenticateUser(AdminDetails admin,@Context HttpServletRequest request)
	{
		AppResponse appRes = new AppResponse();
		int isAuthenticatedUser;
		AdminDAO adminDAO=new AdminDAO();
		try {
			isAuthenticatedUser=adminDAO.authenticateUser(admin);
			if(isAuthenticatedUser==1)
			{
				appRes.setPayload("1");
				HttpSession session =request.getSession(true);
				session.setAttribute("USER",admin);
			}
			else
			{
				appRes.setPayload("0");
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return appRes;
	}

}
