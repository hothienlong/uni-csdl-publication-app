use publication;
delimiter $$

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
    work_email text,
    is_author int,
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
        (id, fname, address, email, company, job, degree, profession) 
        VALUES (user_id,fname,address,email,company,job,degree,profession);
    
    -- a scientist can not be an author/contact author and a editor at the same time --
    -- this will be checked using a trigger

    if (is_author) then
        insert into author (s_id) values (user_id);
	end if;
    if (is_reviewer) then
        insert into reviewer (s_id, work_email, collaboration_date) values (user_id, work_email, curdate());
	end if;
    if (is_editor) then
        insert into editor (s_id, appointed_date) values (user_id, curdate());	
    end if;
    commit;
end$$
delimiter ;
grant execute on procedure publication.create_user to nodejs_application@localhost;

-- ------------------------------------------------------
delimiter |
create procedure insert_password (
	user_id varchar(45),
    pw varchar(80)
)
begin
	insert into password (s_id, hashed_pass) values (user_id, pw);
end |
delimiter ;
grant execute on procedure publication.insert_password to nodejs_application@localhost;



-- ------------------------
drop procedure if exists get_hashed_password;
delimiter |
create procedure get_hashed_password
(
    user_id varchar(45)
)
begin
    select s_id, hashed_pass from password
    where s_id = user_id;
end |

delimiter ;
grant execute on procedure publication.get_hashed_password to nodejs_application@localhost;