use publication;

-- 1 update reviewer info
drop procedure if exists get_profile_reviewer;
delimiter $$
create procedure get_profile_reviewer
(
    reviewer_id varchar(45)
)
begin
    select id, fname,address,email,company,job,degree,profession,collaboration_date,work_email
    from scientist inner join reviewer on id = s_id
    where id = reviewer_id;

end$$
delimiter ;

grant execute on procedure publication.get_profile_reviewer to nodejs_application@localhost;




drop procedure if exists update_information_reviewer ;
delimiter $$
create procedure update_information_reviewer
(
	reviewer_id varchar(45), work_email varchar(45), fname text, address text, email text, company text , job text, degree text, profession text
)
begin

	update reviewer r
    set r.work_email = work_email
	where r.s_id = reviewer_id;
    
  update scientist s
  set s.fname = fname,
  s.address = address,
      s.email = email,
      s.company = company,
      s.job = job,
      s.degree = degree,
      s.profession = profession
  where s.id = reviewer_id;

end$$
delimiter ;


grant execute on procedure publication.update_information_reviewer to nodejs_application@localhost;

-- 2 update reviews
grant select, insert, update, delete on review_summary to nodejs_application@localhost;
grant select, insert, update, delete on criteria_review to nodejs_application@localhost;

-- 3 get paper by type
-- drop procedure if exists get_paper_by_type;
-- delimiter $$
-- create procedure get_paper_by_type
-- (
--     reviewer_id  varchar(45),
--     p_type enum('RESEARCH_PAPER','RESEARCH_OVERVIEW_PAPER','BOOK_REVIEW')
-- )
-- begin
--    	create temporary table reviewer_papers
-- 	select id 
--     from paper 
-- 	join review_assignment_detail on id = review_assignment_detail.p_id
-- 	join reviewer_review_assignment on id = reviewer_review_assignment.paper_id
-- 	where reviewer_review_assignment.reviewer_id = reviewer_id;

--     if(p_type = 'RESEARCH_PAPER') then
--     select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
--     from overview_papers as p
--     inner join reviewer_papers on reviewer_papers.id = overview_papers.id;
--     end if;

--     if(p_type = 'RESEARCH_OVERVIEW_PAPER') then
--     select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
--     from research_papers as p
-- 	inner join reviewer_papers on reviewer_papers.id = research_papers.id;
--     end if;

--     if(p_type = 'BOOK_REVIEW') then
--     select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
--     from book_review_papers as p
-- 	inner join reviewer_papers on reviewer_papers.id = book_review_papers.id;
--     end if;
-- end$$



drop procedure if exists get_paper_by_type ;
delimiter $$
create procedure get_paper_by_type
(
	reviewer_id  varchar(45), type_paper varchar(45)
)
begin
	if (type_paper = 'BOOK_REVIEW') then
        select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, b.isbn, p.status
        from paper p join book_review b on p.id = b.p_id 
        where p.id in (
                select p_id from review_assignment_detail
                where p_id in (
            select r.paper_id
                                from reviewer_review_assignment r
                                where r.reviewer_id = reviewer_id
                )
                and result is null
        );

	elseif (type_paper = 'RESEARCH_OVERVIEW_PAPER') then
        select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, p.status
        from paper p join research_overview_paper r_o on p.id = r_o.p_id 
        where p.id in (
                select p_id from review_assignment_detail
                where p_id in (
                select r.paper_id
                    from reviewer_review_assignment r
                    where r.reviewer_id = reviewer_id
                )
                and result is null
        );
	elseif (type_paper = 'RESEARCH_PAPER') then
        select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date,p.status
        from paper p join research_paper r_p on p.id = r_p.p_id 
        where p.id in (
                select p_id from review_assignment_detail
                where p_id in (
                select r.paper_id
                    from reviewer_review_assignment r
                    where r.reviewer_id = reviewer_id
                )
                and result is null
        );
	end if;

end$$
delimiter ;


grant execute on procedure publication.get_paper_by_type to nodejs_application@localhost;

-- 4 get paper reviewed by this viewer in 3 year
-- drop procedure if exists get_reviewed_paper_by_type_in_years;
-- delimiter $$
-- create procedure get_reviewed_paper_by_type_in_years
-- (
--     reviewer_id  varchar(45),
--     p_type enum('RESEARCH_PAPER','RESEARCH_OVERVIEW_PAPER','BOOK_REVIEW'),
--     year_count int
-- )
-- begin
--    	create temporary table reviewer_papers
-- 	select id 
--     from paper 
-- 	join review_assignment_detail on id = review_assignment_detail.p_id
-- 	join reviewer_review_assignment on id = reviewer_review_assignment.paper_id
-- 	where reviewer_review_assignment.reviewer_id = reviewerId and TIMESTAMPDIFF(YEAR, review_assignment_detail.reviewing_date,CURDATE()) <= year_count;

--     if(p_type = 'RESEARCH_PAPER') then
--     select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
--     from overview_papers as p
--     inner join reviewer_papers on reviewer_papers.id = overview_papers.id;
--     end if;

--     if(p_type = 'RESEARCH_OVERVIEW_PAPER') then
--     select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
--     from research_papers as p
-- 	inner join reviewer_papers on reviewer_papers.id = overview_papers.id;
--     end if;

--     if(p_type = 'BOOK_REVIEW') then
--     select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
--     from book_review_papers as p
-- 	inner join reviewer_papers on reviewer_papers.id = overview_papers.id;
--     end if;
-- end$$



drop procedure if exists get_reviewed_paper_by_type_in_years ;
delimiter $$
create procedure get_reviewed_paper_by_type_in_years
(
	reviewer_id  varchar(45), type_paper varchar(45), year_count int
)
begin
	if (type_paper = 'BOOK_REVIEW') then
        select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, b.isbn ,p.status
        from paper p join book_review b on p.id = b.p_id 
        where p.id in (
                select p_id from review_assignment_detail
                where p_id in (
                select r.paper_id
                    from reviewer_review_assignment r
                    where r.reviewer_id = reviewer_id
                )
                and result is not null
                and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= year_count
        );

	elseif (type_paper = 'RESEARCH_OVERVIEW_PAPER') then
        select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date,p.status
        from paper p join research_overview_paper r_o on p.id = r_o.p_id 
        where p.id in (
                select p_id from review_assignment_detail
                where p_id in (
                select r.paper_id
                                from reviewer_review_assignment r
                                where r.reviewer_id = reviewer_id
                )
                and result is not null
                and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= year_count
        );
	elseif (type_paper = 'RESEARCH_PAPER') then
        select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date,p.status
        from paper p join research_paper r_p on p.id = r_p.p_id 
        where p.id in (
                select p_id from review_assignment_detail
                where p_id in (
                select r.paper_id
                                from reviewer_review_assignment r
                                where r.reviewer_id = reviewer_id
                )
                and result is not null
                and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= year_count
        );
	end if;

end$$
delimiter ;

grant execute on procedure publication.get_reviewed_paper_by_type_in_years to nodejs_application@localhost;

-- 5 get paper of authors
drop procedure if exists get_paper_of_author ;
delimiter $$
create procedure get_paper_of_author
(
	reviewer_id varchar(45),
    author_id varchar(45) 
)
begin

	select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, p.status
    from paper p
    where p.id in (
                    select p_id from review_assignment_detail
                    where p_id in (
                        select r.paper_id
                        from reviewer_review_assignment r
                        where r.reviewer_id = reviewer_id
                    )
                    and result is null
            )
            and p.sent_by = author_id;

end$$
delimiter ;

grant execute on procedure publication.get_paper_of_author to nodejs_application@localhost;
-- call get_paper_of_author('nnhhaadd_sci','vutrongphung');

-- 6 get paper of authors in 3 years
drop procedure if exists get_paper_of_author_in_years ;
delimiter $$
create procedure get_paper_of_author_in_years
(
	reviewer_id varchar(45), 
    author_id varchar(45),
    year_count int
)
begin
    
    select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date,p.status
    from paper p
    where p.id in (
					select p_id from review_assignment_detail
                    where p_id in (
						select r.paper_id
                        from reviewer_review_assignment r
                        where r.reviewer_id = reviewer_id
                    )
                    and result is not null
                    and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= year_count
				)
				and p.sent_by = author_id;
end$$
delimiter ;

grant execute on procedure publication.get_paper_of_author_in_years to nodejs_application@localhost;
-- call get_paper_of_author_in_3_year('nnhhaadd_sci','vutrongphung');

-- 7 get author has been reviewed the most
drop procedure if exists get_author_had_reviewed_most_by_reviewer ;
delimiter $$
create procedure get_author_had_reviewed_most_by_reviewer 
(
	reviewer_id varchar(45)
)
begin
    declare author_id varchar(45);
    
    set author_id = (
        select sent_by
        from paper
        where id in (
            select p_id from review_assignment_detail
            where p_id in (
                select r.paper_id
                from reviewer_review_assignment r
                where r.reviewer_id = reviewer_id
            )
            and result is not null
        )
        group by sent_by
        order by count(sent_by) desc limit 1
    );
    
    select id , fname,address, email, company, job, degree, profession
    from SCIENTIST
    where id = author_id;

end$$
delimiter ;

grant execute on procedure publication.get_author_had_reviewed_most_by_reviewer to nodejs_application@localhost;
-- call get_author_had_reviewed_most_by_reviewer('nnhhaadd_sci');

-- 8 get review result in x years
drop procedure if exists get_result_review_in_years ;
delimiter $$
create procedure get_result_review_in_years
(
	reviewer_id varchar(45),
    year_count int
)
begin
    
    select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, p.status , result
    from review_assignment_detail join paper p on p_id = p.id
    where p_id in (
		select r.paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    )
    and result is not null
    and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= year_count;
    
end$$
delimiter ;

grant execute on procedure publication.get_result_review_in_years to nodejs_application@localhost;
-- call get_result_review_in_1_year('nnhhaadd_sci');

-- 9 get 3 years with the most reviewed paper count
drop procedure if exists get_top_reviewed_paper_count_years;
delimiter $$
create procedure get_top_reviewed_paper_count_years
(
	reviewer_id varchar(45),
    year_count_limit int
)
begin    
	select year(reviewing_date) as year
    from review_assignment_detail
    where p_id in (
		select r.paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    )
    group by year(reviewing_date)
    order by count(year(reviewing_date)) desc
    limit year_count_limit;

end$$
delimiter ;

grant execute on procedure publication.get_top_reviewed_paper_count_years to nodejs_application@localhost;
-- call get_3_year_on_top_review('nnhhaadd_sci');

-- 10 papers with best results
drop procedure if exists get_best_result_paper ;
delimiter $$
create procedure get_best_result_paper
(
	reviewer_id varchar(45)
)
begin
	select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, p.status, result
    from review_assignment_detail join paper p on p_id = p.id
    where p_id in (
		select paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    ) and result = 'ACCEPTANCE'
    limit 3;

end$$
delimiter ;

grant execute on procedure publication.get_best_result_paper to nodejs_application@localhost;

-- call get_best_result_paper('nnhhaadd_sci')

-- 11 papers with worst result
drop procedure if exists get_worst_result_paper ;
delimiter $$
create procedure get_worst_result_paper
(
	reviewer_id varchar(45)
)
begin
	select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, p.status ,result
    from review_assignment_detail join paper p on p_id = p.id
    where p_id in (
		select paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    ) and result = 'REJECTION'
    limit 3;

end$$
delimiter ;

grant execute on procedure publication.get_worst_result_paper to nodejs_application@localhost;

-- call get_worst_result_paper('nnhhaadd_sci')

-- 12 get avg papers 


drop procedure if exists get_avg_reviewed_paper_count_per_year ;
delimiter $$
create procedure get_avg_reviewed_paper_count_per_year
(
	reviewer_id varchar(45),
    number_of_years int
)
begin
    declare total_paper_had_reviewed int;
    select count(p_id)
    into total_paper_had_reviewed
    from review_assignment_detail
    where p_id in (
		select r.paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    )
    and result is not null
    and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= number_of_years;
    
	select year(reviewing_date) as year , count(year(reviewing_date)) / total_paper_had_reviewed as avg_paper_of_year_per_years
    from review_assignment_detail
    where p_id in (
		select r.paper_id
        from reviewer_review_assignment r
        where r.reviewer_id = reviewer_id
    )
    and result is not null
    and TIMESTAMPDIFF(YEAR,reviewing_date,CURDATE()) <= number_of_years
    group by year(reviewing_date)
    order by year(reviewing_date) desc;
end$$
delimiter ;

grant execute on procedure publication.get_avg_reviewed_paper_count_per_year to nodejs_application@localhost;
-- call get_avg_reviewed_paper_count_per_year('nnhhaadd_sci');



-- drop trigger if exists after_assign_by_editor;
-- delimiter $$
-- create trigger after_assign_by_editor
-- after insert 
-- on reviewer_review_assignment for each row
-- begin

-- end$$
-- delimiter ;

drop procedure if exists get_criteria;
delimiter $$
create procedure get_criteria
(

)
begin
    select id, cr_description
    from criteria;
end$$
delimiter ;
grant execute on procedure publication.get_criteria to nodejs_application@localhost;




drop procedure if exists reviewer_insert_review_criteria;
delimiter $$
create procedure reviewer_insert_review_criteria
(
    reviewer_id varchar(45),paper_id varchar(45),criteria_id int,review_content text, review_score int
)
begin
    insert into criteria_review
    values (paper_id,reviewer_id,criteria_id,CURDATE(),review_content,review_score);
end $$

delimiter ;
grant execute on procedure publication.reviewer_insert_review_criteria to nodejs_application@localhost;




drop procedure if exists reviewer_update_review_criteria;
delimiter $$
create procedure reviewer_update_review_criteria
(
    reviewer_id varchar(45),paper_id varchar(45),criteria_id int,review_content text, review_score int
)
begin
    update criteria_review c
    set  
        c.review_content = review_content , 
        c.review_score = review_score,
        c.sent_date = CURDATE()
    where c.p_id = paper_id and  c.reviewer_id = reviewer_id and c.criteria_id = criteria_id;
end$$

delimiter ;
grant execute on procedure publication.reviewer_update_review_criteria to nodejs_application@localhost;



drop procedure if exists reviewer_get_review_criteria;
delimiter $$
create procedure reviewer_get_review_criteria
(
    paper_id varchar(45), reviewer_id varchar(45),criteria_id int
)
begin
    select c.review_content,c.review_score
    from criteria_review c
    where c.p_id = paper_id and c.reviewer_id = reviewer_id and  c.criteria_id = criteria_id;
end$$

delimiter ;
grant execute on procedure publication.reviewer_get_review_criteria to nodejs_application@localhost;



drop procedure if exists update_summary_review;
delimiter $$
create procedure update_summary_review
(
   reviewer_id varchar(45), paper_id varchar(45),  note_for_author text, note_about_paper text
)
begin
    update review_summary r
    set r.note_for_author  = note_for_author , r.note_about_paper = note_about_paper
    where r.p_id = paper_id and r.reviewer_id = reviewer_id;
end$$

delimiter ;
grant execute on procedure publication.update_summary_review to nodejs_application@localhost;



drop procedure if exists insert_summary_review;
delimiter $$
create procedure insert_summary_review
(
    reviewer_id varchar(45),paper_id varchar(45), note_for_author text, note_about_paper text
)
begin
    insert into review_summary
    values (paper_id,reviewer_id,note_for_author,note_about_paper);
end $$

delimiter ;
grant execute on procedure publication.insert_summary_review to nodejs_application@localhost;


drop procedure if exists get_summary_review;
delimiter $$
create procedure get_summary_review
(
    reviewer_id varchar(45), paper_id varchar(45)
)
begin
    select r.note_for_author, r.note_about_paper
    from review_summary r
    where r.p_id = paper_id and r.reviewer_id = reviewer_id;
end$$

delimiter ;
grant execute on procedure publication.get_summary_review to nodejs_application@localhost;







