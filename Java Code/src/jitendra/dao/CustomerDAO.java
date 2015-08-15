package jitendra.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import jitendra.exceptions.AppException;
import jitendra.model.BookingDetails;
import jitendra.model.RestaurantProfileAndSettings;
import jitendra.model.SeatingDetails;
import jitendra.utils.DBUtil;

public class CustomerDAO {

	public BookingDetails reserveTable(BookingDetails bookingDetails) throws AppException {

		Connection con = DBUtil.getConncetionToDB();
		CallableStatement cs = null;
		ResultSet rs=null;
		try {

			cs = con.prepareCall("{call Insert_Into_Reservation_List(?,?,?,?,?,?)}");
			cs.setString(1, bookingDetails.getPartyDate());
			cs.setString(2, bookingDetails.getPartyTime());
			cs.setInt(3, bookingDetails.getPartySize());
			cs.setString(4, bookingDetails.getFirstName());
			cs.setString(5, bookingDetails.getLastName());
			cs.setString(6, bookingDetails.getTelephone());
			rs=cs.executeQuery();
			if(rs.next())
			{
				 bookingDetails.setConfirmationCode(rs.getInt("confirmationCode"));
				 bookingDetails.setStatus(rs.getString("booking_status"));
			}
			} catch (SQLException e) {
			e.printStackTrace();
			throw new AppException("error in booking the table", e.getCause());
		} finally {
			DBUtil.closeConnection(con);
			DBUtil.closeStatement(cs);
			DBUtil.closeResultSet(rs);
		}
		return bookingDetails;
	}
	
	public boolean updateReservation(BookingDetails bookingDetails) throws AppException
	{
		Connection con = DBUtil.getConncetionToDB();
		CallableStatement cs = null;
		boolean isUpdated=false;
		int count;
		try {

			cs = con.prepareCall("{call update_ReservationList(?,?,?,?,?,?)}");
			cs.setInt(1, bookingDetails.getConfirmationCode());
			cs.setInt(2, bookingDetails.getPartySize());
			cs.setString(3, bookingDetails.getPartyDate());
			cs.setString(4, bookingDetails.getPartyTime());
			cs.setString(5, bookingDetails.getTelephone());
			cs.registerOutParameter(6, java.sql.Types.INTEGER);
			cs.executeQuery();
			count=cs.getInt(6);
			if(count>0)
			{
				isUpdated=true;
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new AppException("error in updating the reservation", e.getCause());
		} finally {
			DBUtil.closeConnection(con);
			DBUtil.closeStatement(cs);
		}
		return isUpdated;
	}
	
	public boolean cancelExistingReservation(int confirmationCode) throws AppException
	{
		Connection con = DBUtil.getConncetionToDB();
		CallableStatement cs = null;
		boolean isRemoved=false;
		int count;
		try {
		cs = con.prepareCall("{call delete_record_from_Reservation_List(?,?)}");
		cs.setInt(1, confirmationCode);
		cs.registerOutParameter(2, java.sql.Types.INTEGER);
		cs.executeQuery();
		count=cs.getInt(2);
		if(count>0)
		{
			isRemoved=true;
		}
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new AppException("error in cancelling the reservation", e.getCause());
		} finally {
			DBUtil.closeConnection(con);
			DBUtil.closeStatement(cs);
		}
		return isRemoved;
		
	}
	
	public RestaurantProfileAndSettings retrieveRestaurantProfileAndSettings() throws AppException
	{
		RestaurantProfileAndSettings restaurantData=new RestaurantProfileAndSettings();
		
		Connection con=DBUtil.getConncetionToDB();
		CallableStatement cs=null;
		boolean results;
		try {
			
			cs=con.prepareCall("{call retrieve_restaurant_profile_and_settings()}");
			results=cs.execute();
			if(results)
			{
				ResultSet rs=cs.getResultSet();
				while(rs.next())
				{
					restaurantData.setRestaurantName(rs.getString("restaurantName"));
					restaurantData.setTelephone(rs.getString("phone"));
					restaurantData.setEmail(rs.getString("email"));
					restaurantData.setAddress(rs.getString("address"));
				}
				rs.close();
			}
			results=cs.getMoreResults();
			if(results)
			{
				ResultSet rs=cs.getResultSet();
				while(rs.next())
				{
					restaurantData.setAutoAssign(rs.getBoolean("autoAssign"));
					restaurantData.setOpenDays(rs.getString("openDays"));
					restaurantData.setOpenTime(rs.getString("openTime"));
					restaurantData.setClosingDays(rs.getString("closingDays"));
					restaurantData.setClosingTime(rs.getString("closingTime"));
				}
				rs.close();
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new AppException("error in retrieving Restaurant Profile And Settings", e.getCause());
		} finally {
			DBUtil.closeConnection(con);
			DBUtil.closeStatement(cs);
		}
		
		
		
		return restaurantData;
	}
	
	
	

}
