use publication;

drop procedure if exists get_paper_of_author ;
delimiter $$
create procedure get_paper_of_author
(
	reviewer_id varchar(45) , author_id varchar(45) 
)
begin

	select p.id
    from paper p
    where p.id in (select paper_id 
				from reviewer_review_assignment  r
                where r.reviewer_id = reviewer_id) and p.sent_by = author_id;

end$$
delimiter ;

call get_paper_of_author(7,2)