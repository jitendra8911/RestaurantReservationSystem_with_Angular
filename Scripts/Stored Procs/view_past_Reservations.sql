CREATE  PROCEDURE `view_past_Reservations`(
in contact char(12)
)
BEGIN
select firstName,lastName,confirmationCode,partySize,partyDate,partyTime,phone,booking_status,tableId from reservationList where phone=contact;
END