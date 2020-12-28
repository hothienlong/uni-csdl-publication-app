drop trigger if exists research_paper_page_count_insert;

delimiter $$
create trigger research_paper_page_count_insert
after insert
on research_paper
for each row
begin
	declare p_count int;
	select page_count into p_count
		from paper
		where paper.id = new.p_id
		limit 1;
    if(p_count < 10 or p_count > 20) then
		signal sqlstate '45000' set message_text = 'invalid page count for research paper >= 10  and <= 20';
    end if;
end;$$
delimiter ;

drop trigger if exists research_paper_page_count_update;

delimiter $$
create trigger research_paper_page_count_update
after update
on research_paper
for each row
begin
	declare p_count int;
	select page_count into p_count
		from paper
		where paper.id = new.p_id
		limit 1;
    if(p_count < 10 or p_count > 20) then
		signal sqlstate '45000' set message_text = 'invalid page count for research paper >= 10  and <= 20';
    end if;
end;$$
delimiter ;

drop trigger if exists research_paper_page_count_update_paper;
delimiter $$
create trigger research_paper_page_count_update_paper
after update
on paper
for each row
begin
	declare p_count int;
    declare is_research_paper int;
	select page_count into p_count
		from paper
		where paper.id = new.id
		limit 1;
	select count(*) into is_research_paper
    from research_paper
    where research_paper.p_id = new.id;
    
    if(is_research_paper > 0 and (p_count < 10 or p_count > 20)) then
		signal sqlstate '45000' set message_text = 'invalid page count for research paper >= 10  and <= 20';
    end if;
end;$$
delimiter ;