
delimiter $$
create procedure overview_paper_submission
(p_id varchar(45), title text, summary text, associated_file text, page_count int, sent_by varchar(45))
begin
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
        RESIGNAL;
    END;

    start transaction;
	insert into paper (id, title, summary, associated_file, page_count, sent_by, sent_date)
        values (p_id, title, summary, associated_file, page_count, sent_by, current_date());    
    insert into research_overview_paper
        values (p_id);
    commit;
end$$

create procedure research_paper_submission
(p_id varchar(45), title text, summary text, associated_file text, page_count int, sent_by varchar(45))
begin
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
        RESIGNAL;
    END;

    start transaction;
	insert into paper (id, title, summary, associated_file, page_count, sent_by, sent_date)
        values (p_id, title, summary, associated_file, page_count, sent_by, current_date());
    insert into research_paper
        values (p_id);
    commit;
end$$

delimiter $$
create procedure book_review_submission
(
	p_id varchar(45), title text, summary text, associated_file text, page_count int, sent_by varchar(45), ISBN varchar(45)
)
begin
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any error in the transaction
        RESIGNAL;
    END;
    
    start transaction;
	insert into paper (id, title, summary, associated_file, page_count, sent_by, sent_date)
        values (p_id, title, summary, associated_file, page_count, sent_by, current_date());
        
    insert into book_review
        values (p_id, ISBN);
    commit;
end$$
delimiter ;