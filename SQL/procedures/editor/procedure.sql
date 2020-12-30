use publication;
-- 1 
drop procedure if exists assign_review;
delimiter |
create procedure assign_review 
(editor_id varchar(45), reviewer_id varchar(45), paper_id varchar(45), review_date date)
begin
	if ((select count(*) from review_assignment_detail as r where r.p_id = paper_id) = 0) then
		insert into review_assignment_detail (p_id, reviewing_date) values (paper_id, review_date);
	else 
		update review_assignment_detail set reviewing_date = review_date where p_id = paper_id;
	end if;
    if (reviewer_id != '') then
		insert into reviewer_review_assignment (reviewer_id, paper_id) values (reviewer_id, paper_id);
    end if;
    if ((select count(*) from editor_review_assignment as e where e.editor_id = editor_id and e.paper_id = paper_id) = 0) then
		insert into editor_review_assignment (editor_id, paper_id) values (editor_id, paper_id);
	
    end if;
end |
delimiter ;
grant execute on procedure publication.assign_review to nodejs_application@localhost;


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
grant execute on procedure publication.update_paper_status to nodejs_application@localhost;


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
grant execute on procedure publication.update_result_after_review to nodejs_application@localhost;

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
grant execute on procedure publication.get_paper_by_type_and_status to nodejs_application@localhost;

-- 7
use publication;
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
grant execute on procedure publication.get_posted_paper_by_type_and_years to nodejs_application@localhost;

-- 8
drop procedure if exists get_papers_by_author_and_status;
delimiter |
create procedure get_papers_by_author_and_status(author_id varchar(45), status varchar(45))
begin
	select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, p.status
		from paper as p inner join paper_authors as au on p.id = au.p_id		
        where au.author_id = author_id and p.status = status;
end |
delimiter ;
grant execute on procedure publication.get_papers_by_author_and_status to nodejs_application@localhost;

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
grant execute on procedure publication.get_posted_paper_by_author to nodejs_application@localhost;

-- 10,11,12
drop procedure if exists count_paper_by_status;
delimiter |
create procedure count_paper_by_status(status_paper varchar(45))
begin
	select count(*) from paper where paper.status = status_paper;
end |
delimiter ;
grant execute on procedure publication.count_paper_by_status to nodejs_application@localhost;



drop procedure if exists get_reviewer_by_paper;
delimiter |
create procedure get_reviewer_by_paper(paperId varchar(45))
begin
	select r.reviewer_id
    from reviewer_review_assignment as r where r.paper_id  = paperId;
end |
delimiter ;
grant execute on procedure publication.get_reviewer_by_paper to nodejs_application@localhost;

drop procedure if exists get_reivewing_detail_by_paper;
delimiter |
create procedure get_reivewing_detail_by_paper(paperId varchar(45))
begin
	select r.reviewing_date
    from review_assignment_detail as r where r.p_id  = paperId;
end |
delimiter ;
grant execute on procedure publication.get_reivewing_detail_by_paper to nodejs_application@localhost;


drop procedure if exists get_all_reviewers;
delimiter |
create procedure get_all_reviewers()
begin
	select s_id from reviewer;
end |
delimiter ;
grant execute on procedure publication.get_all_reviewers to nodejs_application@localhost;



drop procedure if exists get_author;
delimiter |
create procedure get_author()
begin
	select s_id from author;
end |
delimiter ;
grant execute on procedure publication.get_author to nodejs_application@localhost;


drop procedure if exists get_paper_by_id;
delimiter |
create procedure get_paper_by_id
(paperId varchar(45))
begin
	select p.id, p.title, p.summary, p.associated_file, p.page_count, p.sent_by, p.sent_date, p.status
	from paper as p where p.id = paperId;	
end |
delimiter ;
grant execute on procedure publication.get_paper_by_id to nodejs_application@localhost;


drop procedure if exists editor_get_papers;

delimiter |
create procedure editor_get_papers
(editorId varchar(45))
begin
	select p.id, title, summary, associated_file, page_count, sent_by, sent_date, p.status from paper as p
		join review_assignment_detail on id = review_assignment_detail.p_id
		join editor_review_assignment on id = editor_review_assignment.paper_id
		where editor_review_assignment.editor_id = editorId;
end |
grant execute on procedure publication.editor_get_papers to nodejs_application@localhost;

drop procedure if exists editor_get_all_papers;
delimiter |
create procedure editor_get_all_papers
()
begin
	select id, title, summary, associated_file, page_count, sent_by, sent_date, status from paper; 
end |
delimiter ;

grant execute on procedure publication.editor_get_all_papers to nodejs_application@localhost;


drop procedure if exists update_paper;
delimiter |
create procedure update_paper (
paperId varchar(45),
title text,
summary text,
associated_file text,
page_count int,
sent_by varchar(45),
sent_date date,
status varchar(45)
)
begin
	update paper as p set p.id = paperId, p.title = title, p.summary = summary, p.associated_file = associated_file,
    p.page_count = page_count, p.sent_by = sent_by, p.sent_date = sent_date, p.status = status
    where p.id = paperId; 
end |
delimiter ;

grant execute on procedure publication.update_paper to nodejs_application@localhost;


