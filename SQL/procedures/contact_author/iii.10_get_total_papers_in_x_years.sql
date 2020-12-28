use publication;
drop procedure if exists get_total_papers_in_x_years;

delimiter $$
create procedure get_total_papers_in_x_years
(
	s_id varchar(45), x int
)
begin
	select year(sent_date) as sent_year, count(*) as total_paper
    from paper
    where sent_by = s_id and sent_date >= DATE_SUB(NOW(),INTERVAL x YEAR)
    group by year(sent_date)
    order by year(sent_date) desc;
end$$
delimiter ;

grant execute on procedure get_total_papers_in_x_years to contact_author@localhost;

call get_total_papers_in_x_years("longauthor", 5);

