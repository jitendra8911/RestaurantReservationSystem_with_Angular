CREATE  PROCEDURE `retrieve_restaurant_profile_and_settings`()
BEGIN
select * from restaurantProfile;
select * from restaurantWebSettings;
END