use publication;

drop procedure if exists get_result_review_in_1_year ;
delimiter $$
create procedure get_result_review_in_1_year
(
	reviewer_id varchar(45)
)
begin
    
    select p_id, result
    from review_assignment_detail
    where p_id in (
		select r.paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    )
    and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= 1;
    
end$$
delimiter ;

call get_result_review_in_1_year('qttho');