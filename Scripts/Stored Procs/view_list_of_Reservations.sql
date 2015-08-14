CREATE DEFINER=`root`@`localhost` PROCEDURE `view_list_of_Reservations`()
BEGIN
select *  from reservationList;
END