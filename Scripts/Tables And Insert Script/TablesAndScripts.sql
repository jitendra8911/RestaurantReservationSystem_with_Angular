create database restaurant_db;

create table login(loginId varchar(50),password varchar(50) not null, primary key(loginId));

create table security_info(securityQuestion_id varchar(10),securityQuestion varchar(200) not null,primary key(securityQuestion_id));

create table restaurant_tables(tableId int,capacity int not null,primary key(tableId));

create table reservationList(confirmationCode int not null AUTO_INCREMENT,tableId int,partyDate date not null,partyTime time not null,partySize int not null,booking_status varchar(30) DEFAULT 'confirmed' ,firstName varchar(100) not null,lastName varchar(100) not null,phone char(12) not null,primary key(confirmationCode),
foreign key(tableId) references restaurant_tables(tableId)
);

create table restaurantProfile(restaurantName varchar(50),phone char(12) not null,email varchar(50) not null,address varchar(100) not null,primary key(restaurantName));

create table restaurantWebSettings(autoAssign bool not null,openTime time not null,closingTime time not null,openDays varchar(100) not null,closingDays varchar(100) not null);


/*alter table reservationList add foreign key(tableId) references restaurant_tables(tableId); */

insert into login values('admin','admin@12345');

insert into login values('admin1','admin@12345');

/* inserting records for restaurant_tables */

insert into restaurant_tables values(1,5);
insert into restaurant_tables values(2,6);
insert into restaurant_tables values(3,8);
insert into restaurant_tables values(4,10);
insert into restaurant_tables values(5,4);
insert into restaurant_tables values(6,2);
insert into restaurant_tables values(7,2);
insert into restaurant_tables values(8,6);
insert into restaurant_tables values(9,10);
insert into restaurant_tables values(10,12);


/* 


/* inserting records into reservationList table */

select * from reservationList;
delete from reservationList;
insert into reservationList values(null,null,'2015-08-09','12:00',5,'confirmed','Jitendra','Malakalapalli','918-287-8750');
insert into reservationList values(null,null,'2015-08-09','18:00',2,'confirmed','Jitendra','Malakalapalli','918-287-8750');
insert into reservationList values(null,3,'2015-08-09','15:00',6,'confirmed','Gopi','Malakalapalli','918-260-5545');
insert into reservationList values(null,null,'2015-08-09','12:00',5,'waiting','Raghav','Sriram','918-212-2323');
insert into reservationList values(null,null,'2015-08-09','13:00',5,'waiting','Pavan','Ande','918-287-8752');
insert into reservationList values(null,10,'2015-08-09','17:00',10,'confirmed','Rakesh','Ega','918-287-8756');
insert into reservationList values(null,10,'2015-08-09','15:00',10,'confirmed','Jitendra','Malakalapalli','918-287-8750');
insert into reservationList values(null,3,'2015-08-09','16:00',8,'confirmed','Charan','Chalichama','918-287-8759');

insert into reservationList(partyDate,partyTime,partySize,firstName,lastName,phone)
values('2015-08-12','12:00',5,'Jitendra','Malakalapalli','918-287-8750');
insert into reservationList values(null,null,'2015-08-12','18:00',2,'confirmed','Jitendra','Malakalapalli','918-287-8750');
insert into reservationList values(null,3,'2015-08-12','21:00',6,'confirmed','Gopi','Malakalapalli','918-260-5545');
insert into reservationList values(null,null,'2015-08-12','12:00',5,'waiting','Raghav','Sriram','918-212-2323');
insert into reservationList values(null,null,'2015-08-12','13:00',5,'waiting','Pavan','Ande','918-287-8752');
insert into reservationList values(null,10,'2015-08-12','21:00',10,'confirmed','Rakesh','Ega','918-287-8756');
insert into reservationList values(null,10,'2015-08-12','20:00',10,'confirmed','Jitendra','Malakalapalli','918-287-8750');
insert into reservationList values(null,3,'2015-08-12','16:00',8,'confirmed','Charan','Chalichama','918-287-8759');
insert into reservationList values(null,null,'2015-08-12','15:20',6,'confirmed','Sreejan','Alapati','918-287-8759');
insert into reservationList values(null,null,'2015-08-12','17:20',6,'confirmed','Johnson','Mithcell','918-287-8780');
insert into reservationList values(null,9,'2015-08-12','17:40',7,'confirmed','Michael','Clarke','918-287-8781');
insert into reservationList values(null,1,'2015-08-12','16:30',5,'confirmed','Steven','Waugh','918-287-7219');
insert into reservationList values(null,1,'2015-08-12','20:30',5,'confirmed','Steven','Waugh','918-287-7219');

delete from reservationList;
drop table reservationLIst;


/* inserting record into restaurant profile */

insert into restaurantprofile values('Jitendra\'s restaurant','918-287-8750','jmalakal@uncc.edu','Greensboro, NC');

/* inserting record into restaurant web settings */

insert into restaurantwebsettings values(false,'10:00','21:00','Monday,Tuesday,Wednesday,Thursday,Friday,Saturday','Sunday');

CALL `restaurant_db`.`Insert_Into_Reservation_List`('2015-08-12','12:00',5,'Jitendra','Malakalapalli','918-287-8750');
select @confCode,@bookingStatus;

CALL `restaurant_db`.`view_seating_area`();

