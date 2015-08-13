package jitendra.rest;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("/session")
public class SessionController {
	
	@GET
	@Path("/logout")
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse logout(@Context HttpServletRequest request)
	{
		AppResponse appRes = new AppResponse();
		HttpSession session=request.getSession(false);
		if(session!=null && session.getAttribute("USER")!=null)
		{
			session.removeAttribute("USER");
			session.invalidate();
			appRes.setMessage("session is removed");
			
		}
		else
		{
			appRes.setMessage("there is no session");
		}
		return appRes;
	}
	
	@GET
	@Path("/checkLogin")
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse checkLogin(@Context HttpServletRequest request)
	{
		AppResponse appRes = new AppResponse();
		HttpSession session=request.getSession(false);
		if(session!=null && session.getAttribute("USER")!=null)
		{
			appRes.setMessage("session is running");
		}
		else
		{
			appRes.setMessage("session is not valid");
			appRes.setStatus(AppResponse.ERROR);
		}
		
		return appRes;
	}

}
