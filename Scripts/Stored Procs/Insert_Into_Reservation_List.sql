CREATE  PROCEDURE `Insert_Into_Reservation_List`(
in confirmationCode int,in tableId int,in partyDate date,in partyTime time,in partySize int,
in booking_status varchar(30),in firstName varchar(100),in lastName varchar(100),in phone char(12),
out flag bit
)
BEGIN
insert into reservationList
values(confirmationCode,tableId,partyDate,partyTime,partySize,booking_status,firstName,lastName,phone);

set flag=ROW_COUNT();
END