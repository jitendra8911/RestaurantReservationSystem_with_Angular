package jitendra.dao;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import jitendra.exceptions.AppException;
import jitendra.model.AdminDetails;
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

}
