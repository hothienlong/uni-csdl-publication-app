use publication;

drop procedure if exists write_paper;
delimiter $$
create procedure write_paper
(
	p_id varchar(45), author_id varchar(45)
)
begin
	insert paper_authors
    values (p_id, author_id);
end$$
delimiter ;

grant execute on procedure write_paper to contact_author@localhost; 

call write_paper(3, 'longauthorwrite');
call write_paper(3, 'longauthor');
