use publication;
drop procedure if exists get_total_papers_in_5_years;

delimiter $$
create procedure get_total_papers_in_5_years
(
	s_id varchar(45)
)
begin
	select count(*) as total_paper
    from paper
    where sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 1 YEAR) and NOW()
	UNION ALL
	select count(*) as total_paper
    from paper
    where sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 2 YEAR) and DATE_SUB(NOW(),INTERVAL 1 YEAR)
	UNION ALL
	select count(*) as total_paper
    from paper
    where sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 3 YEAR) and DATE_SUB(NOW(),INTERVAL 2 YEAR)
	UNION ALL
	select count(*) as total_paper
    from paper
    where sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 4 YEAR) and DATE_SUB(NOW(),INTERVAL 3 YEAR)
	UNION ALL
	select count(*) as total_paper
    from paper
    where sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 5 YEAR) and DATE_SUB(NOW(),INTERVAL 4 YEAR);
end$$
delimiter ;

grant execute on procedure get_total_papers_in_5_years to contact_author@localhost;

call get_total_papers_in_5_years("longauthor");

