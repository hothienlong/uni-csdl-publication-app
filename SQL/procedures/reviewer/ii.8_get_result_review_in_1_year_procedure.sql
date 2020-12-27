use publication;

drop procedure if exists get_result_review_in_1_year ;
delimiter $$
create procedure get_result_review_in_1_year
(
	reviewer_id varchar(45)
)
begin
    
    select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, result
    from review_assignment_detail join paper p on p_id = p.id
    where p_id in (
		select r.paper_id
        from review_review_assignment r
        where r.reviewer_id = reviewer_id
    )
    and result is not null
    and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= 1;
    
end$$
delimiter ;

grant execute on procedure publication.get_result_review_in_1_year to reviewer@localhost;

call get_result_review_in_1_year('nnhhaadd_sci');