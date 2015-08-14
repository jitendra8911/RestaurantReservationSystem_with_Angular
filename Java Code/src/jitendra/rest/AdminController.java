package jitendra.rest;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import jitendra.dao.AdminDAO;
import jitendra.exceptions.AppException;
import jitendra.model.BookingDetails;
import jitendra.model.SeatingDetails;
import jitendra.model.TableDetails;

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
	
	
	@GET
	@Path("/viewReservationDetails/{confirmationCode}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse viewReservationDetails(@PathParam("confirmationCode") int confirmationCode)
	{
		AppResponse appRes=new AppResponse();
		BookingDetails bookingDetails=new BookingDetails();
		AdminDAO adminDAO=new AdminDAO();
		try {
			bookingDetails=adminDAO.retrieveReservationDetails(confirmationCode);
			appRes.setPayload(bookingDetails);
			if(bookingDetails.getStatus()==null)
			{
				appRes.setMessage("there is no reservation with this confirmation number");
			}
			else
			{
			appRes.setMessage("sucessfully retrieved booking details");
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("error in retrieving booking details");
			appRes.setStatus(AppResponse.ERROR);
			e.printStackTrace();
		}
		
		return appRes;
	}
	
	
	
	@GET
	@Path("/viewReservationsList")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse viewReservationsList()
	{
		AppResponse appRes=new AppResponse();
		ArrayList<BookingDetails> bookingDetailsList=new ArrayList<BookingDetails>();
		AdminDAO adminDAO=new AdminDAO();
		try {
			bookingDetailsList=adminDAO.retrieveReservationsList();
			appRes.setPayload(bookingDetailsList);
			appRes.setMessage("sucessfully retrieved reservations list");
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("error in retrieving reservations list");
			appRes.setStatus(AppResponse.ERROR);
			e.printStackTrace();
		}
		
		return appRes;
	}
	
	
	
	@GET
	@Path("/viewVacantTables/{partyTime}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse viewVacantTables(@PathParam("partyTime") String partyTime)
	{
		AppResponse appRes=new AppResponse();
		ArrayList<TableDetails> tableDetailsList=new ArrayList<TableDetails>();
		AdminDAO adminDAO=new AdminDAO();
		try {
			tableDetailsList=adminDAO.retrieveVacantTables(partyTime);
			appRes.setPayload(tableDetailsList);
			
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("error in retrieving vacant tables");
			appRes.setStatus(AppResponse.ERROR);
			e.printStackTrace();
		}
		
		return appRes;
	}
	
	
	@GET
	@Path("/changeAssignTable/{confirmationCode}/{tableId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse changeAssignTable(@PathParam("confirmationCode") int confirmationCode,@PathParam("tableId") int tableId )
	{
		AppResponse appRes=new AppResponse();
		BookingDetails bookingDetails=new BookingDetails();
		AdminDAO adminDAO=new AdminDAO();
		try {
			bookingDetails=adminDAO.changeAssignTable(confirmationCode,tableId);
			appRes.setPayload(bookingDetails);
			if(bookingDetails.getTableId()==null)
			{
				appRes.setMessage("could not change or assign table to this confirmation number");
			}
			else
			{
			appRes.setMessage("sucessfully changed/assigned table");
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("error in changing/assigning table and retrieving back the updated reservation details");
			appRes.setStatus(AppResponse.ERROR);
			e.printStackTrace();
		}
		
		return appRes;
	}
	
	


}
