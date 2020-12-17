use publication;

drop procedure if exists reviewer_get_papers;

delimiter $$
create procedure reviewer_get_papers
(reviewerId varchar(45))
begin
	select title, summary, associated_file, page_count, sent_by, sent_date from paper 
		join review_assignment_detail on id = review_assignment_detail.p_id
		join review_review_assignment on id = review_review_assignment.paper_id
		where review_review_assignment.reviewer_id = reviewerId;
end$$
delimiter ;

grant execute on procedure publication.reviewer_get_papers to reviewer@localhost;