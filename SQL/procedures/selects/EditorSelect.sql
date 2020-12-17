use publication;

drop procedure if exists editor_get_papers;
drop procedure if exists editor_get_all_papers;

delimiter $$
create procedure editor_get_papers
(editorId varchar(45))
begin
	select title, summary, associated_file, page_count, sent_by, sent_date from paper 
		join review_assignment_detail on id = review_assignment_detail.p_id
		join editor_review_assignment on id = editor_review_assignment.paper_id
		where editor_review_assignment.editor_id = editorId;
end$$

create procedure editor_get_all_papers
()
begin
	select id, title, summary, associated_file, page_count, sent_by, sent_date from paper; 
end$$
delimiter ;

grant execute on procedure publication.editor_get_papers to editor@localhost;
grant execute on procedure publication.editor_get_all_papers to editor@localhost;