use publication;

drop procedure if exists get_paper_of_author_in_3_year ;
delimiter $$
create procedure get_paper_of_author_in_3_year
(
	reviewer_id varchar(45) , author_id varchar(45) 
)
begin
    
    select p.id
    from paper p
    where p.id in (
					select p_id from review_assignment_detail
                    where p_id in (
						select r.paper_id
                        from reviewer_review_assignment r
                        where r.reviewer_id = reviewer_id
                    )
                    and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= 3
				)
				and p.sent_by = author_id;
end$$
delimiter ;

call get_paper_of_author_in_3_year('qttho','vuhoanglan');