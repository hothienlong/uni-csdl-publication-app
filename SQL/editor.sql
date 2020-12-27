use publication;
drop trigger if exists checkAssignReviewer;

delimiter |
create trigger checkAssignReviewer
before insert
on reviewer_review_assignment for each row
begin
    if ((select count(*) from reviewer_review_assignment as r where r.paper_id = new.paper_id) = 3) then
		signal sqlstate '45000' SET message_text = 'This paper already has three reviewer.';
	end if;
end |
delimiter ;

grant update on publication.scientist to editor@localhost;

-- 1 assignments
grant insert update delete on publication.review_assignment_detail to editor@localhost;
grant insert delete on publication.editor_review_assignment to editor@localhost;
grant insert delete on publication.reviewer_review_assignment to editor@localhost;

-- 2 update paper status
grant update (status) on publication.paper to editor@localhost;

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