use publication;

drop procedure if exists get_paper_of_author_in_3_year ;
delimiter $$
create procedure get_paper_of_author_in_3_year
(
	reviewer_id varchar(45) , author_id varchar(45) 
)
begin
    
    select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
    from paper p
    where p.id in (
					select p_id from review_assignment_detail
                    where p_id in (
						select r.paper_id
                        from review_review_assignment r
                        where r.reviewer_id = reviewer_id
                    )
                    and result is not null
                    and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= 3
				)
				and p.sent_by = author_id;
end$$
delimiter ;

grant execute on procedure publication.get_paper_of_author_in_3_year to reviewer@localhost;

call get_paper_of_author_in_3_year('nnhhaadd_sci','vutrongphung');