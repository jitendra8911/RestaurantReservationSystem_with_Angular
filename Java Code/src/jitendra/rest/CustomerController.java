package jitendra.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import jitendra.dao.CustomerDAO;
import jitendra.exceptions.AppException;
import jitendra.model.BookingDetails;
import jitendra.model.RestaurantProfileAndSettings;

@Path("/customer")
public class CustomerController {
	
	@POST
	@Path("/reserveTable")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse reserveTable(BookingDetails bookingDetails)
	{
		AppResponse appRes=new AppResponse();
		CustomerDAO customerDAO=new CustomerDAO();
		try {
			bookingDetails=customerDAO.reserveTable(bookingDetails);
			appRes.setMessage("Successfully reserved a table with confirmation number : "+bookingDetails.getConfirmationCode()+ " .Please save it for future reference");
			appRes.setPayload(bookingDetails);
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			appRes.setMessage("could not reserve the table");
			appRes.setStatus(AppResponse.ERROR);
		}
		return appRes;
	}
	
	
	

	@POST
	@Path("/updateReservation")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse updateReservation(BookingDetails bookingDetails)
	{
		AppResponse appRes=new AppResponse();
		CustomerDAO customerDAO=new CustomerDAO();
		boolean isUpdated;
		try {
			isUpdated=customerDAO.updateReservation(bookingDetails);
			if(isUpdated)
			{
				appRes.setMessage("Successfully updated the reservation");
			}
			else
			{
				appRes.setMessage("There are no changes in the reservation to update");
				appRes.setStatus(AppResponse.ERROR);
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			appRes.setMessage("could not update the reservation");
			appRes.setStatus(AppResponse.ERROR);
		}
		return appRes;
	}
	

	@GET
	@Path("/cancelReservation/{confirmationCode}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse cancelReservation(@PathParam("confirmationCode") int confirmationCode)
	{
		AppResponse appRes=new AppResponse();
		CustomerDAO customerDAO=new CustomerDAO();
		boolean isRemoved;
		try {
			isRemoved=customerDAO.cancelExistingReservation(confirmationCode);
			if(isRemoved)
			{
				appRes.setMessage("successfully canceled the reservation");
			}
			else
			{
				appRes.setMessage("there is no such reservation with the given confirmation number");
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			appRes.setMessage("error in cancelling the reservation");
			appRes.setStatus(AppResponse.ERROR);
		}
		return appRes;
	}
	
	
	@GET
	@Path("/getRestaurantDetails")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppResponse getRestaurantDetails()
	{
		AppResponse appRes=new AppResponse();
		RestaurantProfileAndSettings restaurantData;
		CustomerDAO customerDAO=new CustomerDAO();
		try {
			restaurantData=customerDAO.retrieveRestaurantProfileAndSettings();
			appRes.setPayload(restaurantData);
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			appRes.setMessage("error in retrieving Restaurant profile and settings");
			appRes.setStatus(AppResponse.ERROR);
		}
		return appRes;
	}
	

}
