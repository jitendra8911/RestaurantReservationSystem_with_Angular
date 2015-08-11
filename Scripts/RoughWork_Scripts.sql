update reservationList set partyDate='2015-08-09';
select * from restaurant_tables;
select * from reservationList;
select * from restaurant_tables join reservationlist on restaurant_tables.tableId=reservationlist.tableId
where reservationlist.partyDate=Date(sysdate());

select * from reservationList where partyTime>now()+INTERVAL 1 HOUR;

SELECT TIMESTAMPDIFF(hour,'2015-08-09',date(sysdate()));

select firstName,partyTime,tableId, abs(hour(timediff(time(sysdate()),partyTime))) from reservationList where 
partyDate='2015-08-10' and tableId is not null;
select tableId from restaurant_tables where tableId not in(select tableId from reservationlist where partyDate=date(sysdate()) and abs(hour(timediff(time(sysdate()),partyTime)))<1 and tableId is not null) ;

select * from reservationlist where tableId is not null;

select 'available' as status,tableId from restaurant_tables where tableId  not in
(select tableId from reservationlist where partyDate=date(sysdate()) and 
hour(timediff(time(sysdate()),partyTime))<1 and tableId is not null and time(sysdate())>partyTime) ;


select 'occupied' as status,tableId from restaurant_tables where tableId in
(select tableId from reservationlist where partyDate=date(sysdate()) and 
hour(timediff(time(sysdate()),partyTime))<1 and tableId is not null and time(sysdate())>partyTime) ;
