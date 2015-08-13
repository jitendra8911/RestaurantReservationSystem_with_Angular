package jitendra.model;

public class SeatingDetails {
	
	private int tableId;
	private int capacity;
	private String status;
	private String partyTime;
	private Integer confirmationCode;
	public int getTableId() {
		return tableId;
	}
	public void setTableId(int tableId) {
		this.tableId = tableId;
	}
	public int getCapacity() {
		return capacity;
	}
	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPartyTime() {
		return partyTime;
	}
	public void setPartyTime(String partyTime) {
		this.partyTime = partyTime;
	}
	public Integer getConfirmationCode() {
		return confirmationCode;
	}
	public void setConfirmationCode(Integer confirmationCode) {
		this.confirmationCode = confirmationCode;
	}
	
	

}
