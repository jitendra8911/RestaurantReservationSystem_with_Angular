CREATE  PROCEDURE `view_list_of_Reservations`()
BEGIN
select confirmationCode,firstName,lastName,tableId,partySize  from reservationList;
END