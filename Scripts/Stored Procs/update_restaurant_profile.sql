CREATE  PROCEDURE `update_restaurant_profile`(

in name varchar(50),in contact char(12),in emailId varchar(50),in restaurantAddress varchar(100)
)
BEGIN
update restaurantProfile 
set restaurantName=name,phone=contact,email=emailId,address=restaurantAddress;
END