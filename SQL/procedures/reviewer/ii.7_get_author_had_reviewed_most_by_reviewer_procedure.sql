use publication;

drop procedure if exists get_author_had_reviewed_most_by_reviewer ;
delimiter $$
create procedure get_author_had_reviewed_most_by_reviewer 
(
	reviewer_id varchar(45)
)
begin
    select sent_by, count(sent_by) as num
    from paper
    where id in (	select r.paper_id 
                    from reviewer_review_assignment r
                    where r.reviewer_id = reviewer_id)
    group by sent_by
    order by num desc limit 1;
    
end$$
delimiter ;

call get_author_had_reviewed_most_by_reviewer('qttho');