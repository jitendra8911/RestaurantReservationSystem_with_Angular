package jitendrda.tests;

import jitendra.dao.AdminDAO;
import jitendra.exceptions.AppException;
import jitendra.model.AdminDetails;

public class AdminLoginTest {
	
	public static void main(String[] args)
	{
		AdminDAO adminDAO=new AdminDAO();
		AdminDetails admin=new AdminDetails();
		admin.setLoginId("admin");
		admin.setPassword("admin@12345");
		int isValid;
		try {
			isValid=adminDAO.authenticateUser(admin);
			System.out.println(isValid);
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
