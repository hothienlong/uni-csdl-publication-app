use publication;

drop procedure if exists submit_overview_paper;
drop procedure if exists submit_research_paper;
drop procedure if exists submit_book_review;

delimiter $$
create procedure submit_overview_paper
(p_id varchar(45), title text, summary text, associated_file text, page_count int, sent_by varchar(45), sent_date date)
begin
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
        RESIGNAL;
    END;

    start transaction;
	insert into paper (id, title, summary, associated_file, page_count, sent_by, sent_date)
        values (p_id, title, summary, associated_file, page_count, sent_by, sent_date);    
    insert into research_overview_paper
        values (p_id);
    commit;
end$$

create procedure submit_research_paper
(p_id varchar(45), title text, summary text, associated_file text, page_count int, sent_by varchar(45), sent_date date)
begin
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
        RESIGNAL;
    END;

    start transaction;
	insert into paper (id, title, summary, associated_file, page_count, sent_by, sent_date)
        values (p_id, title, summary, associated_file, page_count, sent_by, sent_date);
    insert into research_paper
        values (p_id);
    commit;
end$$

drop procedure if exists submit_book_review;
delimiter $$
create procedure submit_book_review
(
	p_id varchar(45), title text, summary text, associated_file text, page_count int, sent_by varchar(45), sent_date date,
    ISBN varchar(45), book_page_count int, publish_year year, book_title text, publisher text,
    author_name varchar(45)
)
begin
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
        RESIGNAL;
    END;
    
    start transaction;
	insert into paper (id, title, summary, associated_file, page_count, sent_by, sent_date)
        values (p_id, title, summary, associated_file, page_count, sent_by, sent_date);

    insert ignore into book (ISBN, page_count, publish_year, title, publisher)
        values (ISBN, book_page_count, publish_year, book_title, publisher);
    
    insert into book_review
        values (p_id, ISBN);
        
	insert into book_author
		values (ISBN, author_name);
    commit;
end$$
delimiter ;

grant execute on procedure publication.submit_overview_paper to contact_author@localhost;
grant execute on procedure publication.submit_research_paper to contact_author@localhost;
grant execute on procedure publication.submit_book_review to contact_author@localhost;