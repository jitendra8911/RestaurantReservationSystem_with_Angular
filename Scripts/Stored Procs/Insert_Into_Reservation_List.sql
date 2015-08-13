CREATE PROCEDURE `Insert_Into_Reservation_List`(
in partyDate date,in partyTime time,in partySize int,
in firstName varchar(100),in lastName varchar(100),in phone char(12)
)
BEGIN
insert into reservationList(partyDate,partyTime,partySize,firstName,lastName,phone)
values(partyDate,partyTime,partySize,firstName,lastName,phone);
SELECT  confirmationCode,booking_Status from reservationList where confirmationCode=LAST_INSERT_ID();
END