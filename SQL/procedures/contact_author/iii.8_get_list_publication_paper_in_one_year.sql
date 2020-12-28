use publication;
drop procedure if exists get_list_publication_paper;

delimiter $$
create procedure get_list_publication_paper
(
	s_id varchar(45)
)
begin
	select *
    from paper p
    where p.sent_by = s_id 
		and p.status = 'PUBLICATION';
end$$
delimiter ;

grant execute on procedure get_list_publication_paper to contact_author@localhost;

call get_list_publication_paper("longauthor");

