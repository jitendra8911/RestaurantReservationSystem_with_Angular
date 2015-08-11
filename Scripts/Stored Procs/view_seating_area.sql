CREATE  PROCEDURE `view_seating_area`(

)
BEGIN


create  temporary table if not exists available_tables 

select 'available' as status,tableId,capacity from restaurant_tables where tableId not in
(select tableId from reservationlist where partyDate=date(sysdate()) and 
hour(timediff(time(sysdate()),partyTime))<1 and tableId is not null and time(sysdate())>partyTime) ;

select * from available_tables;

create  temporary table if not exists occupied_tables 

select  'occupied' as status, rt.capacity,rt.tableId,max(rl.partyTime) as party_time,rl.confirmationCode from restaurant_tables rt 
join reservationList rl on rt.tableId=rl.tableId where rt.tableid not in (select tableId from available_tables)

group by tableId
;

select * from occupied_tables;

select * from available_tables left outer join occupied_tables on available_tables.tableId=occupied_tables.tableId;




drop temporary table if exists occupied_tables;

drop temporary table if exists available_tables;


END