create user nodejs_application@localhost identified by 'nodejs_application_password';
ALTER USER 'nodejs_application'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nodejs_application_password';
grant all privileges on publication.* to 'nodejs_application'@'localhost';

grant execute on procedure get_user_roles to nodejs_application@localhost;

drop procedure if exists get_user_roles;
delimiter $$
create procedure get_user_roles
(userId varchar(45))
begin
	declare isAuthor boolean;
    declare isReviewer boolean;
    declare isEditor boolean;
    
    set isAuthor = (SELECT count(s_id) FROM author WHERE s_id = userId) = 1;
    set isReviewer = (SELECT count(s_id) FROM reviewer WHERE s_id = userId) = 1;
    set isEditor = (SELECT count(s_id) FROM editor WHERE s_id = userId) = 1;
    
    select isAuthor, isReviewer, isEditor;
end$$

