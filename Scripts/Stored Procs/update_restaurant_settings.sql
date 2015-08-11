CREATE  PROCEDURE `update_restaurant_settings`(
in autoAssignProperty bool,in restaurantOpenTime time,in restaurantClosingTIme time,in restaurantOpenDays varchar(100),
in restaurantClosingDays varchar(100)
)
BEGIN
update restaurantWebSettings set autoAssign=autoAssignProperty,openTIme=restaurantOpenTime,closingTime=restaurantClosingTIme,
openDays=restaurantOpenDays,closingDays=restaurantClosingDays;
END