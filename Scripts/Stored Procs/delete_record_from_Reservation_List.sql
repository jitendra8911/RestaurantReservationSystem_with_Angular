CREATE  PROCEDURE `delete_record_from_Reservation_List`(
in confCode int,out count int
)
BEGIN
delete from reservationList where confirmationCode=confCode;
set count= ROW_COUNT();
END