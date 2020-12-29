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

delimiter $$
create procedure create_user_account
(
    user_id varchar(45),
    fname text,
    address text,
    email text,
    company text,
    job text,
    degree text,
    profession text,
    work_email text,
    is_author int,
    is_reviewer int,
    is_editor int,
    hashed_password text
)
begin
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
        RESIGNAL;
    END;

    start transaction;
    call create_user(user_id, fname, address, email, company, job, degree, profession, work_email, is_author, is_reviewer, is_editor);
    insert into password (s_id, hashed_pass) values (user_id, hashed_password);
    commit;
end$$
delimiter ;

delimiter $$
create procedure get_hashed_password
(
    user_id varchar(45)
)
begin
    select s_id, hashed_pass from password
    where s_id = user_id;
end$$

delimiter ;