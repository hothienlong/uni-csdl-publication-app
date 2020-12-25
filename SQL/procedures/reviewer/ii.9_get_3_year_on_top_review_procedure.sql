use publication;

drop procedure if exists get_3_year_on_top_review ;
delimiter $$
create procedure get_3_year_on_top_review
(
	reviewer_id varchar(45)
)
begin
    
	select year(reviewing_date)
    from review_assignment_detail
    where p_id in (
		select r.paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    )
    group by year(reviewing_date)
    order by count(year(reviewing_date)) desc
    limit 3;

end$$
delimiter ;

call get_3_year_on_top_review('qttho');