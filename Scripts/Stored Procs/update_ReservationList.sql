CREATE  PROCEDURE `update_ReservationList`(
in confirmCode int,in pSize int,in pDate date,in pTime time,in contact char(12),
out count int
)
BEGIN
update reservationList
set partySize=pSize, partyDate=pDate, partyTime=pTime,phone=contact
where confirmationCode=confirmCode;
set count= ROW_COUNT();
END