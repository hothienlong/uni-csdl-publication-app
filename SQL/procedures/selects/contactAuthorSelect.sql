use publication;

drop procedure if exists contact_author_get_papers;
delimiter $$
create procedure contact_author_get_papers
(
	s_id varchar(45)
)
begin

	select title, summary, associated_file, page_count, sent_by, sent_date
    from paper
    where sent_by = s_id;
    
end$$
delimiter ;

call contact_author_get_papers('longauthor');