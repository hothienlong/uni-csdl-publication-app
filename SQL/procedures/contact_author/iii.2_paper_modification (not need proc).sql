use publication;

drop procedure if exists edit_paper;
drop procedure if exists delete_paper;

delimiter $$
-- create procedure edit_paper
-- (
-- 	s_id varchar(45), p_id varchar(45), title text, summary text, associated_file text, page_count int, sent_by varchar(45), sent_date date
-- )
-- begin
-- 	update paper p
--     set p.title = title, 
-- 		p.summary = summary, 
--         p.associated_file = associated_file, 
--         p.page_count = page_count, 
--         p.sent_by = sent_by,
--         p.sent_date = sent_date
--     where id = p_id and p.sent_by = s_id;
    
-- 	select *
--     from paper
--     where id = p_id and sent_by = s_id;
-- end$$

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

call edit_paper('longauthor',3,'title3','update summary','file3',100,'longauthor','2020-12-08');