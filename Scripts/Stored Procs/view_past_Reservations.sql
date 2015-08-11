CREATE  PROCEDURE `view_past_Reservations`(
in contact char(12)
)
BEGIN
select confirmationCode,partySize,partyDate from reservationList where phone=contact;

END