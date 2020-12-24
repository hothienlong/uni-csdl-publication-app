use publication;

drop procedure if exists get_best_result_paper ;
delimiter $$
create procedure get_best_result_paper
(
	reviewer_id varchar(45)
)
begin
	select p_id
    from review_assignment_detail
    where p_id in (
		select paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    ) and result = 'ACCEPTANCE'
    limit 3;

end$$
delimiter ;

call get_best_result_paper('qttho')