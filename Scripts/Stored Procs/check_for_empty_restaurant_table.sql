CREATE PROCEDURE `check_for_empty_restaurant_table`(
in pTime time
)
BEGIN
select * from restaurant_tables where tableId not in
(select tableId from reservationlist where partyDate=date(sysdate()) and 
abs(hour(timediff(pTime,partyTime)))<1 and tableId is not null) ;
END