CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_record_from_Reservation_List`(
in confCode int
)
BEGIN
delete from reservationList where confirmationCode=confCode;
END