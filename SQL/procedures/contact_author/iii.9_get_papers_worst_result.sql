use publication;
drop procedure if exists get_papers_worst_result;
drop procedure if exists get_papers_result;

delimiter $$
create procedure get_papers_result
(
	s_id varchar(45)
)
begin
	select
		ID, TITLE, SUMMARY, SENT_DATE, STATUS, RESULT
    from paper p
    join review_assignment_detail rad on (p.id = rad.p_id)
    where p.sent_by = s_id;
end$$
create procedure get_papers_worst_result
(
	s_id varchar(45)
)
begin
	select
		ID, TITLE, SUMMARY, SENT_DATE, STATUS, RESULT
    from paper p
    join review_assignment_detail rad on (p.id = rad.p_id)
    where p.sent_by = s_id
		and rad.result = 'REJECTION';
end$$
delimiter ;

grant execute on procedure get_papers_result to contact_author@localhost;
grant execute on procedure get_papers_worst_result to contact_author@localhost;

call get_papers_result("longcontact");
call get_papers_worst_result("longcontact");

