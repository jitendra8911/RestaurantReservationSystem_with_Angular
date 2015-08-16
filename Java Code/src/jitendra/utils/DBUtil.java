package jitendra.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

public class DBUtil {

	private final static String URL = "jdbc:mysql://localhost:3306/restaurant_db";
	private final static String USER = "root";
	private final static String PASSWORD = "root";

	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static Connection getConncetionToDB() {

		Connection con = null;
		try {
			con = DriverManager.getConnection(URL, USER, PASSWORD);
			System.out.println("Connection is succesfull");
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Error establishing connection to database : " + e.getMessage());
		}
		return con;

	}

	public static void closeResources(PreparedStatement ps, ResultSet rs, Connection con) {
		try {
			if (ps != null) {
				ps.close();
			}
			if (rs != null) {
				rs.close();
			}
			if (con != null) {
				con.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
	}
	
	public static void closeGeneralResources(List<Statement> sqlStatements, Connection con) {
		try {
			
			for(Statement st:sqlStatements)
			{
				if(st !=null)
				{
					st.close();
				}
		    }
					} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
	}
	
	public static void closeConnection(Connection con)
	{
		if (con != null) {
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public static void closeResultSet(ResultSet rs)
	{
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public static void closeStatement(Statement st)
	{
		if(st !=null)
		{
			try {
				st.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public static void main(String args[]) {
		DBUtil.getConncetionToDB();
	}

}
