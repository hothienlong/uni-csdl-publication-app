use publication;
drop procedure if exists get_total_overview_papers_in_5_years;

delimiter $$
create procedure get_total_overview_papers_in_5_years
(
	s_id varchar(45)
)
begin
	select count(*) as total_paper
    from research_overview_paper rop
    join paper p on (rop.p_id = p.id)
    where p.sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 1 YEAR) and NOW()
	UNION ALL
	select count(*) as total_paper
    from research_overview_paper rop
    join paper p on (rop.p_id = p.id)
    where p.sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 2 YEAR) and DATE_SUB(NOW(),INTERVAL 1 YEAR)
	UNION ALL
	select count(*) as total_paper
    from research_overview_paper rop
    join paper p on (rop.p_id = p.id)
    where p.sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 3 YEAR) and DATE_SUB(NOW(),INTERVAL 2 YEAR)
	UNION ALL
	select count(*) as total_paper
    from research_overview_paper rop
    join paper p on (rop.p_id = p.id)
    where p.sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 4 YEAR) and DATE_SUB(NOW(),INTERVAL 3 YEAR)
	UNION ALL
	select count(*) as total_paper
    from research_overview_paper rop
    join paper p on (rop.p_id = p.id)
    where p.sent_by = s_id
		and 
        sent_date between DATE_SUB(NOW(),INTERVAL 5 YEAR) and DATE_SUB(NOW(),INTERVAL 4 YEAR);
end$$
delimiter ;

grant execute on procedure get_total_overview_papers_in_5_years to contact_author@localhost;

call get_total_overview_papers_in_5_years("longauthor");

