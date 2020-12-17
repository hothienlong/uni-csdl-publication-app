use publication;

ALTER TABLE scientist
ADD HASHED_PASS TEXT NOT NULL;

drop procedure if exists get_user_roles;

delimiter $$
create procedure get_user_roles
(userId varchar(45))
begin
	declare isAuthor boolean;
    declare isContactAuthor boolean;
    declare isReviewer boolean;
    declare isEditor boolean;
    
    set isAuthor = (SELECT count(s_id) FROM author WHERE s_id = userId) = 1;
    set isContactAuthor = (SELECT count(s_id) FROM contact_author WHERE s_id = userId) = 1;
    set isReviewer = (SELECT count(s_id) FROM reviewer WHERE s_id = userId) = 1;
    set isEditor = (SELECT count(s_id) FROM editor WHERE s_id = userId) = 1;
    
    select isAuthor, isContactAuthor, isReviewer, isEditor;
end$$
delimiter ;

grant EXECUTE on procedure publication.get_user_roles to authentication@localhost;