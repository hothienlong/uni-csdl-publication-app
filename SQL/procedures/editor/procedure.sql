-- 1 
drop procedure if exists assign_review;
delimiter |
create procedure assign_review 
(editor_id varchar(45), reviewer_id varchar(45), paper_id varchar(45), review_date date)
begin
	if ((select count(*) from review_assignment_detail as r where r.p_id = paper_id) = 0) then
		insert into review_assignment_detail (p_id, reviewing_date) values (paper_id, review_date);
	end if;
    insert into review_review_assignment (reviewer_id, paper_id) values (reviewer_id, paper_id);
    insert into editor_review_assignment (editor_id, paper_id) values (editor_id, paper_id);
end |
delimiter ;
grant execute on procedure publication.assign_review to editor@localhost;


-- 2
drop procedure if exists update_paper_status;
delimiter |
create procedure update_paper_status
(paper_id varchar(45), status varchar(45))
begin
	update paper 
		set paper.status = status
		where paper.id = paper_id;
end |
delimiter ;
grant execute on procedure publication.update_paper_status to editor@localhost;

-- 4
drop procedure if exists update_result_after_review;
delimiter |
create procedure update_result_after_review 
(paper_id varchar(45), result varchar(45), inform_date date)
begin
	update paper 
		set status = 'COMPLETED_REVIEW'
		where paper.id = paper_id;
    update review_assignment_detail as r
		set r.inform_date = inform_date,
			r.result = result
		where r.p_id = paper_id;
end |
delimiter ;
grant execute on procedure publication.update_result_after_review to editor@localhost;

-- 5,6
drop procedure if exists get_paper_by_type_and_status;
delimiter |
create procedure get_paper_by_type_and_status
(type_paper varchar(45), status_paper varchar(45))
begin
	if (type_paper = 'BOOK_REVIEW') then
		select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, b.isbn
		from paper as p inner join book_review as b on p.id = b.p_id where p.id in (select id  from paper where status = status_paper);
	elseif (type_paper = 'RESEARCH_OVERVIEW_PAPER') then
		select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
		from paper as p inner join research_over_view_paper as r on p.id = r.p_id where p.id in (select id  from paper where status = status_paper);
    elseif (type_paper = 'RESEARCH_PAPER') then
		select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
		from paper as p inner join research_paper as r on p.id = r.p_id where p.id in (select id  from paper where status = status_paper);
    end if;
end |
delimiter ;
grant execute on procedure publication.get_paper_by_type_and_status to editor@localhost;

-- 7
drop procedure if exists get_posted_paper_by_type_and_years;
delimiter |
create procedure get_posted_paper_by_type_and_years(type_paper varchar(45), distant_year int)
begin
	if (type_paper = 'BOOK_REVIEW') then
		select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, b.isbn
		from paper as p inner join book_review as b on p.id = b.p_id
			inner join review_assignment_detail as re on p.id = re.p_id
		where p.id in (select id  from paper where status = 'POSTED') and datediff(current_date, re.inform_date) < 365*distant_year;
	elseif (type_paper = 'RESEARCH_OVERVIEW_PAPER') then
		select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
		from paper as p inner join research_over_view_paper as r on p.id = r.p_id
			inner join review_assignment_detail as re on p.id = re.p_id
        where p.id in (select id  from paper where status = 'POSTED') and datediff(current_date, re.inform_date) < 365*distant_year;
    elseif (type_paper = 'RESEARCH_PAPER') then
		select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
		from paper as p inner join research_paper as r on p.id = r.p_id 
			inner join review_assignment_detail as re on p.id = re.p_id
        where p.id in (select id  from paper where status = 'POSTED') and datediff(current_date, re.inform_date) < 365*distant_year;
    end if;
end |
delimiter ;
grant execute on procedure publication.get_posted_paper_by_type_and_years to editor@localhost;

-- 8
drop procedure if exists get_published_paper_by_author;
delimiter |
create procedure get_published_paper_by_author(author_id varchar(45))
begin
	select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
		from paper as p inner join paper_author as au on p.id = au.p_id		
        where au.author_id = author_id and p.status = 'PUBLICATION';
end |
delimiter ;
grant execute on procedure publication.get_published_paper_by_author to editor@localhost;

-- 9
drop procedure if exists get_posted_paper_by_author;
delimiter |
create procedure get_posted_paper_by_author(author_id varchar(45))
begin
	select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date
		from paper as p inner join paper_author as au on p.id = au.p_id		
        where au.author_id = author_id and p.status = 'POSTED';
end |
delimiter ;
grant execute on procedure publication.get_posted_paper_by_author to editor@localhost;

-- 10,11,12
drop procedure if exists count_paper_by_status;
delimiter |
create procedure count_paper_by_status(status_paper varchar(45))
begin
	select count(*) from paper where paper.status = status_paper;
end |
delimiter ;
grant execute on procedure publication.count_paper_by_status to editor@localhost;