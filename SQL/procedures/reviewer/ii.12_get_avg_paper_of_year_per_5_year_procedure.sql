use publication;

drop procedure if exists get_avg_paper_of_year_per_5_year ;
delimiter $$
create procedure get_avg_paper_of_year_per_5_year
(
	reviewer_id varchar(45)
)
begin
    declare total_paper_had_reviewed int;
    select count(p_id)
    into total_paper_had_reviewed
    from review_assignment_detail
    where p_id in (
		select r.paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    );
    
    
	select year(reviewing_date) , count(year(reviewing_date)) / total_paper_had_reviewed as avg_paper_of_year_per_5_year
    from review_assignment_detail
    where p_id in (
		select r.paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    )
    group by year(reviewing_date)
    order by year(reviewing_date) desc
    limit 5;

end$$
delimiter ;

call get_avg_paper_of_year_per_5_year('qttho');