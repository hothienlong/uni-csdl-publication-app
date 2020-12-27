use publication;
drop procedure if exists get_list_posted_paper_in_one_year;

delimiter $$
create procedure get_list_posted_paper_in_one_year
(
	s_id varchar(45)
)
begin
	select *
    from paper p
    where p.sent_by = s_id 
		and p.status = 'POSTED'
		and p.sent_date >= DATE_SUB(NOW(),INTERVAL 1 YEAR); -- 1 year ago
end$$
delimiter ;

grant execute on procedure get_list_posted_paper_in_one_year to contact_author@localhost;

call get_list_posted_paper_in_one_year("longauthor");

