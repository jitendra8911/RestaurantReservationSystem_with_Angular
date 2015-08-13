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
import jitendra.model.SeatingDetails;
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

}
