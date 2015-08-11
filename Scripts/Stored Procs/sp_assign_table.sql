CREATE PROCEDURE `sp_assign_table`(
in confCode int,in id int
)
BEGIN

update  reservationList
set tableId=id where confirmationCode=confCode;
END