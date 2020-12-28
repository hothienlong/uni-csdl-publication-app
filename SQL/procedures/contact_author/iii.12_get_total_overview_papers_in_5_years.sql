use publication;
drop procedure if exists get_total_overview_papers_in_5_years;

delimiter $$
create procedure get_total_overview_papers_in_5_years
(
	s_id varchar(45)
)
begin
	select year(sent_date) as sent_year, count(*) as total_paper
    from research_overview_paper rop
    join paper p on (rop.p_id = p.id)
    where p.sent_by = s_id
		and sent_date >= DATE_SUB(NOW(),INTERVAL 5 YEAR)
	group by year(sent_date)
    order by year(sent_date) desc;
end$$
delimiter ;

grant execute on procedure get_total_overview_papers_in_5_years to contact_author@localhost;

call get_total_overview_papers_in_5_years("longauthor");
