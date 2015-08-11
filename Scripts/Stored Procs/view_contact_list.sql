CREATE  PROCEDURE `view_contact_list`()
BEGIN
select distinct phone,firstName,lastName from reservationList;
END