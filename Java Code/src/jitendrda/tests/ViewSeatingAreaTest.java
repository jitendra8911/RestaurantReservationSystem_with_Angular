package jitendrda.tests;

import java.util.ArrayList;

import jitendra.dao.AdminDAO;
import jitendra.exceptions.AppException;
import jitendra.model.SeatingDetails;

public class ViewSeatingAreaTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		AdminDAO adminDAO=new AdminDAO();
		ArrayList<SeatingDetails> seatingDetailsList=new ArrayList<SeatingDetails>();
		try {
			seatingDetailsList=adminDAO.viewSeatingArea();
			if(seatingDetailsList!=null)
			{
				for(SeatingDetails seatingDetails:seatingDetailsList)
				{
					System.out.println(seatingDetails.getCapacity());
					System.out.println(seatingDetails.getConfirmationCode());
					System.out.println(seatingDetails.getPartyTime());
					System.out.println(seatingDetails.getStatus());
					System.out.println(seatingDetails.getTableId());
					System.out.println("\n");
				}
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
