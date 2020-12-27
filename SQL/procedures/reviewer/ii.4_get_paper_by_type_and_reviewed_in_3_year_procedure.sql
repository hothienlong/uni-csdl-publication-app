use publication;

drop procedure if exists get_paper_by_type_in_3_year ;
delimiter $$
create procedure get_paper_by_type_in_3_year
(
	reviewer_id  varchar(45), type_paper varchar(45)
)
begin
	if (type_paper = 'BOOK_REVIEW') then
                select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, b.isbn
                from paper p join book_review b on p.id = b.p_id 
                where p.id in (
                        select p_id from review_assignment_detail
                        where p_id in (
					    select r.paper_id
                                        from reviewer_review_assignment r
                                        where r.reviewer_id = reviewer_id
                        )
                        and result is not null
                        and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= 3
                );

	elseif (type_paper = 'RESEARCH_OVERVIEW_PAPER') then
                select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
                from paper p join research_overview_paper r_o on p.id = r_o.p_id 
                where p.id in (
                        select p_id from review_assignment_detail
                        where p_id in (
					    select r.paper_id
                                        from reviewer_review_assignment r
                                        where r.reviewer_id = reviewer_id
                        )
                        and result is not null
                        and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= 3
                );
	elseif (type_paper = 'RESEARCH_PAPER') then
                select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
                from paper p join research_paper r_p on p.id = r_p.p_id 
                where p.id in (
                        select p_id from review_assignment_detail
                        where p_id in (
					    select r.paper_id
                                        from reviewer_review_assignment r
                                        where r.reviewer_id = reviewer_id
                        )
                        and result is not null
                        and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= 3
                );
	end if;

end$$
delimiter ;


grant execute on procedure publication.get_paper_by_type_in_3_year to reviewer@localhost;


call get_paper_by_type_in_3_year('nnhhaadd_sci','RESEARCH_OVERVIEW_PAPER')