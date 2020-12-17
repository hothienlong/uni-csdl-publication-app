use publication;

drop procedure if exists edit_paper;
drop procedure if exists delete_paper;

delimiter $$
create procedure edit_paper
(
	p_id varchar(45), title text, summary text, associated_file text, page_count int, sent_by varchar(45), sent_date date
)
begin
	update paper p
    set p.id = p_id, 
		p.title = title, 
		p.summary = summary, 
        p.associated_file = associated_file, 
        p.page_count = page_count, 
        p.sent_date = sent_date
    where p.sent_by = sent_by and id = p_id;
    
	select *
    from paper
    where id = p_id;
end$$

create procedure delete_paper
(
	s_id varchar(45), p_id varchar(45)
)
begin
	select *
    from paper
    where sent_by = s_id and id = p_id;
    
	delete from paper
    where sent_by = s_id and id = p_id;
end$$
delimiter ;

grant execute on procedure edit_paper to author@localhost;
grant execute on procedure edit_paper to contact_author@localhost;
grant execute on procedure delete_paper to contact_author@localhost;