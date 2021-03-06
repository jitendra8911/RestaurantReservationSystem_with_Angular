package jitendra.rest;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import jitendra.dao.AdminDAO;
import jitendra.exceptions.AppException;
import jitendra.model.BookingDetails;
import jitendra.model.CustomerDetails;
import jitendra.model.RestaurantProfileAndSettings;
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
			appRes.setMessage("Sucessfully retrieved seating details");
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("Error in retrieving seating details");
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
				appRes.setMessage("There is no reservation with this confirmation number");
				appRes.setStatus(AppResponse.ERROR);
			}
			else
			{
			appRes.setMessage("Sucessfully retrieved booking details");
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("Error in retrieving booking details");
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
			appRes.setMessage("Sucessfully retrieved reservations list");
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("Error in retrieving reservations list");
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
			appRes.setMessage("Error in retrieving vacant tables");
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
				appRes.setMessage("Could not change or assign table to this confirmation number");
			}
			else
			{
			appRes.setMessage("Sucessfully changed/assigned table");
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("Error in changing/assigning table and retrieving back the updated reservation details");
			appRes.setStatus(AppResponse.ERROR);
			e.printStackTrace();
		}
		
		return appRes;
	}
	
	
	
	
	@GET
	@Path("/viewContacts")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse viewContacts()
	{
		AppResponse appRes=new AppResponse();
		ArrayList<CustomerDetails> contactList=new ArrayList<CustomerDetails>();
		AdminDAO adminDAO=new AdminDAO();
		try {
			contactList=adminDAO.retrieveContacts();
			appRes.setPayload(contactList);
			appRes.setMessage("Sucessfully retrieved customer contact list");
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("Error in retrieving customer contact list");
			appRes.setStatus(AppResponse.ERROR);
			e.printStackTrace();
		}
		
		return appRes;
	}
	
	
	
	@GET
	@Path("/viewPastReservations/{telephone}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse viewReservationsList(@PathParam("telephone") String telephone)
	{
		AppResponse appRes=new AppResponse();
		ArrayList<BookingDetails> bookingDetailsList=new ArrayList<BookingDetails>();
		AdminDAO adminDAO=new AdminDAO();
		try {
			bookingDetailsList=adminDAO.viewPastReservations(telephone);
			appRes.setPayload(bookingDetailsList);
			appRes.setMessage("Sucessfully retrieved past reservations");
		} catch (AppException e) {
			// TODO Auto-generated catch block
			appRes.setMessage("Error in retrieving past reservations");
			appRes.setStatus(AppResponse.ERROR);
			e.printStackTrace();
		}
		
		return appRes;
	}
	
	
	@POST
	@Path("/updateRestaurantProfile")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse updateRestaurantProfile(RestaurantProfileAndSettings restaurantData)
	{
		AppResponse appRes=new AppResponse();
		AdminDAO adminDAO=new AdminDAO();
		int count;
		try {
			count=adminDAO.updateRestaurantProfile(restaurantData);
			if(count>0)
			appRes.setMessage("Successfully updated restaurant profile");
			else
			{
				appRes.setMessage("Couldn't update restaurant profile");
				appRes.setStatus(AppResponse.ERROR);
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			appRes.setMessage("Error in updating restaurant profile");
			appRes.setStatus(AppResponse.ERROR);
		}
		return appRes;
	}
	
	
	
	@POST
	@Path("/updateRestaurantWebSettings")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse updateRestaurantWebSettings(RestaurantProfileAndSettings restaurantData)
	{
		AppResponse appRes=new AppResponse();
		AdminDAO adminDAO=new AdminDAO();
		int count;
		try {
			count=adminDAO.updateRestaurantWebSettings(restaurantData);
			if(count>0)
			appRes.setMessage("Successfully update restaurant web settings");
			else
			{
				appRes.setMessage("Couldn't update restaurant web settings");
				appRes.setStatus(AppResponse.ERROR);
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			appRes.setMessage("Error in updating restaurant web settings");
			appRes.setStatus(AppResponse.ERROR);
		}
		return appRes;
	}

}
