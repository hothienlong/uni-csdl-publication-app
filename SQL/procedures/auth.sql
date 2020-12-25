use publication;

-- turn this alter table on if the table does not contain hashed_pass column
ALTER TABLE scientist
ADD HASHED_PASS TEXT NOT NULL;

drop procedure if exists get_user_roles;
drop procedure if exists create_user;
drop procedure if exists get_hashed_password;

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

create procedure create_user
(
    user_id varchar(45),
    fname text,
    address text,
    email text,
    company text,
    job text,
    degree text,
    profession text,
    hashed_pass text,
    work_email text,
    is_author int,
    is_contact_author int,
    is_reviewer int,
    is_editor int
)
begin
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
        RESIGNAL;
    END;

    start transaction;
    insert into scientist
        (id, hashed_pass, fname, address, email, company, job, degree, profession) 
        VALUES (user_id,hashed_pass,fname,address,email,company,job,degree,profession);
    
    -- a scientist can not be an author/contact author and a editor at the same time --
    -- this will be checked using a trigger

    if (is_author) then
        insert into author (s_id) values (user_id);
	end if;
    if (is_contact_author) then
        insert into contact_author (s_id) values (user_id);
	end if;
    if (is_reviewer) then
        insert into reviewer (s_id, work_email, collaboration_date) values (user_id, work_email, curdate());
	end if;
    if (is_editor) then
        insert into editor (s_id, appointed_date) values ('test', curdate());	
    end if;
    commit;
end$$

create procedure get_hashed_password
(
    user_id varchar(45)
)
begin
    select id, hashed_pass from scientist
    where id = user_id;
end$$

delimiter ;

grant EXECUTE on procedure publication.get_user_roles to authentication@localhost;
grant execute on procedure publication.create_user to authentication@localhost;
grant execute on procedure publication.get_hashed_password to authentication@localhost;