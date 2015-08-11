CREATE  PROCEDURE `AuthenticateUser`(in username varchar(50),in pwd varchar(50),out flag bit)
BEGIN
select * from login where loginId=username and password=pwd;
SET @rows = FOUND_ROWS();
if @rows>0
then
set flag=1;
else
set flag=0;
END if;
end

/*CALL `restaurant_db`.`AuthenticateUser`('admi', 'admin@12345',@flag);
select @flag; */