CREATE  PROCEDURE `change_assign_table`(
in confCode int,in id int
)
BEGIN

update  reservationList
set tableId=id,booking_status='confirmed' where confirmationCode=confCode;
select * from reservationList where confirmationCode=confCode;
END