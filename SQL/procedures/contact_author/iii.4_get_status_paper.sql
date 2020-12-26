use publication;
drop procedure if exists get_status_paper;

delimiter $$
create procedure get_status_paper
(
	s_id varchar(45), p_id varchar(45)
)
begin
	select status
    from paper
    where id = p_id and sent_by = s_id;
end$$
delimiter ;

grant execute on procedure get_status_paper to contact_author@localhost;

call get_status_paper("longcontact", 14);

