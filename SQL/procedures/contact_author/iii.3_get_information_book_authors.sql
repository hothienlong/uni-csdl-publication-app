use publication;
drop procedure if exists get_information_book_authors;

delimiter $$
create procedure get_information_book_authors
(
	s_id varchar(45), p_id varchar(45)
)
begin
	select
		id ,
        fname, 
        address, 
        email, 
        company,
        job,
        degree,
        profession
	from scientist
	where id in (
			select author_id
			from paper_authors pa
            join paper p on (pa.p_id = p.id)
			where pa.p_id = p_id and p.sent_by = s_id
	);
end$$
delimiter ;

grant execute on procedure get_information_book_authors to contact_author@localhost;

call get_information_book_authors("longcontact",3);

