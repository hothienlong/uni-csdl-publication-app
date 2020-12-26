use publication;
drop procedure if exists get_papers_worst_result;

delimiter $$
create procedure get_papers_worst_result
(
	s_id varchar(45)
)
begin
	select
		id, title, summary, associated_file, page_count, sent_by, sent_date, status, result
    from paper p
    join review_assignment_detail rad on (p.id = rad.p_id)
    where p.sent_by = s_id
		and rad.result = 'REJECT';
end$$
delimiter ;

grant execute on procedure get_papers_worst_result to contact_author@localhost;

call get_papers_worst_result("longauthor");

