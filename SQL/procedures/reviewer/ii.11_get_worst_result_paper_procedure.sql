use publication;

drop procedure if exists get_worst_result_paper ;
delimiter $$
create procedure get_worst_result_paper
(
	reviewer_id varchar(45)
)
begin
	select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, result
    from review_assignment_detail join paper p on p_id = p.id
    where p_id in (
		select paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    ) and result = 'REJECTION'
    limit 3;

end$$
delimiter ;

grant execute on procedure publication.get_worst_result_paper to reviewer@localhost;

call get_worst_result_paper('nnhhaadd_sci')


