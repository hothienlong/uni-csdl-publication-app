use publication;

drop procedure if exists contact_author_get_papers;
delimiter $$
create procedure contact_author_get_papers
(
	s_id varchar(45)
)
begin

	select *
    from paper
    where sent_by = s_id;
    
end$$
delimiter ;

call contact_author_get_papers('longcontact');