package jitendra.rest;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import jitendra.dao.AdminDAO;
import jitendra.exceptions.AppException;
import jitendra.model.SeatingDetails;

@Path("/admin")
public class AdminController {
	
	@GET
	@Path("/viewSeatingArea")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse viewSeatingArea()
	{
		AppResponse appRes=new AppResponse();
		ArrayList<SeatingDetails> seatingDetailsList=new ArrayList<SeatingDetails>();
		AdminDAO adminDAO=new AdminDAO();
		try {
			seatingDetailsList=adminDAO.viewSeatingArea();
			appRes.setPayload(seatingDetailsList);
			appRes.setMessage("sucessfully retrieved seating details");
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("error in retrieving seating details");
			appRes.setStatus(AppResponse.ERROR);
			e.printStackTrace();
		}
		
		return appRes;
	}

}
