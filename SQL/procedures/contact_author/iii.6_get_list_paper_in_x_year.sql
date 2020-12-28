use publication;
drop procedure if exists get_list_paper_in_x_years;

delimiter $$
create procedure get_list_paper_in_x_years
(
	s_id varchar(45), x int
)
begin
	if x is null then
		select *
        from paper
        where sent_by = s_id;
	else 
		select *
		from paper p
		where p.sent_by = s_id 
			and p.sent_date >= DATE_SUB(NOW(),INTERVAL x YEAR);
	end if;

end$$
delimiter ;

grant execute on procedure get_list_paper_in_x_years to contact_author@localhost;

call get_list_paper_in_x_years("longauthor", null);

