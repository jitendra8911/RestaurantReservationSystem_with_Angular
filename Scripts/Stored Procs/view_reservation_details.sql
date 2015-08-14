CREATE  PROCEDURE `view_reservation_details`(
in confCode int,out count int
)
BEGIN
select tableId,partyDate,partyTime,partySize,booking_status,firstName,lastName,phone
from reservationList where confirmationCode=confCode;
SET count = FOUND_ROWS();
END