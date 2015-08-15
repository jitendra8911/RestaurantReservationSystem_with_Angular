package jitendra.dao;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import jitendra.exceptions.AppException;
import jitendra.model.AdminDetails;
import jitendra.model.BookingDetails;
import jitendra.model.CustomerDetails;
import jitendra.model.RestaurantProfileAndSettings;
import jitendra.model.SeatingDetails;
import jitendra.model.TableDetails;
import jitendra.utils.DBUtil;
public class AdminDAO {
	
	
	public int authenticateUser(AdminDetails admin) throws AppException
	{
        int isValid=0;
    	List<Statement> sqlStatements=new ArrayList<Statement>();
		Connection con=DBUtil.getConncetionToDB();
		CallableStatement cs=null;
		try {
			
			cs=con.prepareCall("{call AuthenticateUser(?,?,?)}");
			sqlStatements.add(cs);
			cs.setString(1,admin.getLoginId());
			cs.setString(2, admin.getPassword());
			cs.registerOutParameter(3, java.sql.Types.BIT);
			cs.executeQuery();
			isValid=cs.getInt(3);
			
		
		} catch (SQLException e) {
					e.printStackTrace();
					throw  new AppException("error in authenticating the user",e.getCause());
		}
		finally
		{
			DBUtil.closeGeneralResources(sqlStatements, con);
		}
		return isValid;
		
	}
	
	public ArrayList<SeatingDetails> viewSeatingArea() throws AppException
	{
		ArrayList<SeatingDetails> seatingDetailsList=new ArrayList<SeatingDetails>();
		Connection con=DBUtil.getConncetionToDB();
		CallableStatement cs=null;
		boolean results;
		try {
			
			cs=con.prepareCall("{call view_seating_area()}");
			results=cs.execute();
			if(results)
			{
				ResultSet rs=cs.getResultSet();
				while(rs.next())
				{
					SeatingDetails seatingDetails=new SeatingDetails();
					seatingDetails.setStatus(rs.getString("status"));
					seatingDetails.setTableId(rs.getInt("tableId"));
					seatingDetails.setCapacity(rs.getInt("capacity"));
					seatingDetailsList.add(seatingDetails);
				}
				rs.close();
			}
			results=cs.getMoreResults();
			if(results)
			{
				ResultSet rs=cs.getResultSet();
				while(rs.next())
				{
					SeatingDetails seatingDetails=new SeatingDetails();
					seatingDetails.setStatus(rs.getString("status"));
					seatingDetails.setTableId(rs.getInt("tableId"));
					seatingDetails.setCapacity(rs.getInt("capacity"));
					seatingDetails.setPartyTime(rs.getString("party_time"));
					seatingDetails.setConfirmationCode(rs.getInt("confirmationCode"));
					seatingDetailsList.add(seatingDetails);
				}
				rs.close();
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new AppException("error in retrieving seating area details", e.getCause());
		} finally {
			DBUtil.closeConnection(con);
			DBUtil.closeStatement(cs);
		}
		
		return seatingDetailsList;
	}
	
	
	public BookingDetails retrieveReservationDetails(int confirmationCode) throws AppException
	{
		BookingDetails bookingDetails=new BookingDetails();
		bookingDetails.setConfirmationCode(confirmationCode);
		Connection con=DBUtil.getConncetionToDB();
		CallableStatement cs=null;
		int count;
		ResultSet rs=null;
		try {
			
			cs=con.prepareCall("{call view_reservation_details(?,?)}");
			cs.setInt(1,confirmationCode);
			cs.registerOutParameter(2, java.sql.Types.INTEGER);
			rs=cs.executeQuery();
			count=cs.getInt(2);
			while(rs.next())
			{
				
				bookingDetails.setFirstName(rs.getString("firstName"));
				bookingDetails.setLastName(rs.getString("lastName"));
				bookingDetails.setPartyDate(rs.getString("partyDate"));
				bookingDetails.setPartySize(rs.getInt("partySize"));
				bookingDetails.setPartyTime(rs.getString("partyTime"));
				bookingDetails.setStatus(rs.getString("booking_status"));
				bookingDetails.setTelephone(rs.getString("phone"));
				if(rs.getInt("tableId")!=0)
				bookingDetails.setTableId(rs.getInt("tableId"));
				
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw  new AppException("error in retrieving reservation details",e.getCause());
}
finally
{
	DBUtil.closeConnection(con);
	DBUtil.closeStatement(cs);
	DBUtil.closeResultSet(rs);
}
		
		return bookingDetails;
	}
	
	
	
	public ArrayList<BookingDetails> retrieveReservationsList() throws AppException
	{
		ArrayList<BookingDetails> bookingDetailsList=new ArrayList<BookingDetails>();
		Connection con=DBUtil.getConncetionToDB();
		CallableStatement cs=null;
		ResultSet rs=null;
		try {
			
			cs=con.prepareCall("{call view_list_of_Reservations()}");
			rs=cs.executeQuery();
				while(rs.next())
				{
					BookingDetails bookingDetails=new BookingDetails();
					bookingDetails.setStatus(rs.getString("booking_status"));
					if(rs.getInt("tableId")!=0)
					bookingDetails.setTableId(rs.getInt("tableId"));
					bookingDetails.setConfirmationCode(rs.getInt("confirmationCode"));
					bookingDetails.setPartySize(rs.getInt("partySize"));
					bookingDetails.setFirstName(rs.getString("firstName"));
					bookingDetails.setLastName(rs.getString("lastName"));
					bookingDetails.setPartyDate(rs.getString("partyDate"));
					bookingDetails.setPartyTime(rs.getString("partyTime"));
					bookingDetails.setTelephone(rs.getString("phone"));
					bookingDetailsList.add(bookingDetails);
				}
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new AppException("error in retrieving reservation list", e.getCause());
		} finally {
			DBUtil.closeConnection(con);
			DBUtil.closeStatement(cs);
			DBUtil.closeResultSet(rs);
		}
		
		return bookingDetailsList;
	}
	
	public ArrayList<TableDetails> retrieveVacantTables(String partyTime) throws AppException
	{
		ArrayList<TableDetails> tableDetailsList=new ArrayList<TableDetails>();
		Connection con=DBUtil.getConncetionToDB();
		CallableStatement cs=null;
		ResultSet rs=null;
		try {
			
			cs=con.prepareCall("{call check_for_empty_restaurant_table(?)}");
			cs.setString(1,partyTime);
			rs=cs.executeQuery();
				while(rs.next())
				{
					TableDetails tableDetails=new TableDetails();
					tableDetails.setTableId(rs.getInt("tableId"));
					tableDetails.setCapacity(rs.getInt("capacity"));
					tableDetailsList.add(tableDetails);
				}
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new AppException("error in retrieving vacant tables", e.getCause());
		} finally {
			DBUtil.closeConnection(con);
			DBUtil.closeStatement(cs);
			DBUtil.closeResultSet(rs);
		}
		
		return tableDetailsList;
	}
	
	
	
	public BookingDetails changeAssignTable(int confirmationCode,int tableId) throws AppException
	{
		BookingDetails bookingDetails=new BookingDetails();
		bookingDetails.setConfirmationCode(confirmationCode);
		Connection con=DBUtil.getConncetionToDB();
		CallableStatement cs=null;
		ResultSet rs=null;
		try {
			
			cs=con.prepareCall("{call change_assign_table(?,?)}");
			cs.setInt(1,confirmationCode);
			cs.setInt(2,tableId);
			rs=cs.executeQuery();
			while(rs.next())
			{
				
				bookingDetails.setFirstName(rs.getString("firstName"));
				bookingDetails.setLastName(rs.getString("lastName"));
				bookingDetails.setPartyDate(rs.getString("partyDate"));
				bookingDetails.setPartySize(rs.getInt("partySize"));
				bookingDetails.setPartyTime(rs.getString("partyTime"));
				bookingDetails.setStatus(rs.getString("booking_status"));
				bookingDetails.setTelephone(rs.getString("phone"));
				if(rs.getInt("tableId")!=0)
				bookingDetails.setTableId(rs.getInt("tableId"));
				
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw  new AppException("error in changing/assigning table and retrieving back the updated reservation details",e.getCause());
}
finally
{
	DBUtil.closeConnection(con);
	DBUtil.closeStatement(cs);
	DBUtil.closeResultSet(rs);
}
		
		return bookingDetails;
	}
	
	
	
	
	public ArrayList<CustomerDetails> retrieveContacts() throws AppException
	{
		ArrayList<CustomerDetails> customerDetailsLIst=new ArrayList<CustomerDetails>();
		Connection con=DBUtil.getConncetionToDB();
		CallableStatement cs=null;
		ResultSet rs=null;
		try {
			
			cs=con.prepareCall("{call view_contact_list()}");
			rs=cs.executeQuery();
			while(rs.next())
			{
				CustomerDetails customerDetails=new CustomerDetails();
				customerDetails.setFirstName(rs.getString("firstName"));
				customerDetails.setLastName(rs.getString("lastName"));
				customerDetails.setTelephone(rs.getString("phone"));	
				customerDetailsLIst.add(customerDetails);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw  new AppException("error in retrieving customer contacts",e.getCause());
}
finally
{
	DBUtil.closeConnection(con);
	DBUtil.closeStatement(cs);
	DBUtil.closeResultSet(rs);
}
		
		return customerDetailsLIst;
	}
	
	
	public ArrayList<BookingDetails> viewPastReservations(String telephone) throws AppException
	{
		ArrayList<BookingDetails> bookingDetailsList=new ArrayList<BookingDetails>();
		Connection con=DBUtil.getConncetionToDB();
		CallableStatement cs=null;
		ResultSet rs=null;
		try {
			
			cs=con.prepareCall("{call view_past_Reservations(?)}");
			cs.setString(1,telephone);
			rs=cs.executeQuery();
				while(rs.next())
				{
					BookingDetails bookingDetails=new BookingDetails();
					bookingDetails.setConfirmationCode(rs.getInt("confirmationCode"));
					bookingDetails.setPartySize(rs.getInt("partySize"));
					bookingDetails.setFirstName(rs.getString("firstName"));
					bookingDetails.setLastName(rs.getString("lastName"));
					bookingDetails.setPartyDate(rs.getString("partyDate"));
					bookingDetails.setPartyTime(rs.getString("partyTime"));
					bookingDetails.setTelephone(rs.getString("phone"));
					bookingDetails.setStatus(rs.getString("booking_status"));
					if(rs.getInt("tableId")!=0)
					bookingDetails.setTableId(rs.getInt("tableId"));
					bookingDetailsList.add(bookingDetails);
				}
		}
		catch (SQLException e) {
			e.printStackTrace();
			throw new AppException("error in retrieving past reservations", e.getCause());
		} finally {
			DBUtil.closeConnection(con);
			DBUtil.closeStatement(cs);
			DBUtil.closeResultSet(rs);
		}
		
		return bookingDetailsList;
	}
	
	
	
	public int updateRestaurantProfile(RestaurantProfileAndSettings restaurantData) throws AppException {

		Connection con = DBUtil.getConncetionToDB();
		CallableStatement cs = null;
		int count;
		try {

			cs = con.prepareCall("{call update_restaurant_profile(?,?,?,?,?)}");
			cs.setString(1, restaurantData.getRestaurantName());
			cs.setString(2, restaurantData.getTelephone());
			cs.setString(3, restaurantData.getEmail());
			cs.setString(4, restaurantData.getAddress());
			cs.registerOutParameter(5, java.sql.Types.INTEGER);
			cs.executeQuery();
			count=cs.getInt(5);
			} catch (SQLException e) {
			e.printStackTrace();
			throw new AppException("error in updating Restaurant Profile", e.getCause());
		} finally {
			DBUtil.closeConnection(con);
			DBUtil.closeStatement(cs);
		}
		return count;
	}

}
