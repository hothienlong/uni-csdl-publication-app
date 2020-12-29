drop trigger if exists book_review_paper_page_count_insert;

delimiter $$
create trigger book_review_paper_page_count_insert
after insert
on book_review
for each row
begin
	declare p_count int;
	select page_count into p_count
		from paper
		where paper.id = new.p_id
		limit 1;
    if(p_count < 3 or p_count > 6) then
		signal sqlstate '45000' set message_text = 'invalid page count for book review >= 3  and <= 6';
    end if;
end;$$
delimiter ;

drop trigger if exists book_review_paper_page_count_update;

delimiter $$
create trigger book_review_paper_page_count_update
after update
on book_review
for each row
begin
	declare p_count int;
	select page_count into p_count
		from paper
		where paper.id = new.p_id
		limit 1;
    if(p_count < 3 or p_count > 6) then
		signal sqlstate '45000' set message_text = 'invalid page count for book review >= 3  and <= 6';
    end if;
end;$$
delimiter ;

drop trigger if exists book_review_paper_page_count_update_paper;
delimiter $$
create trigger book_review_paper_page_count_update_paper
after update
on paper
for each row
begin
	declare p_count int;
    declare is_book_review int;
	select page_count into p_count
		from paper
		where paper.id = new.id
		limit 1;
	select count(*) into is_book_review
    from book_review
    where book_review.p_id = new.id;
    
    if(is_book_review > 0 and (p_count < 3 or p_count > 6)) then
		signal sqlstate '45000' set message_text = 'invalid page count for book review >= 3  and <= 6';
    end if;
end;$$
delimiter ;