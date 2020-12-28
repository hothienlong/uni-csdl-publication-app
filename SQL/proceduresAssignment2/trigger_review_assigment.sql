drop trigger if exists review_assignment;

delimiter $$
create trigger review_assignment
after insert
on reviewer_review_assignment
for each row
begin
	declare reviewer_count int;
    set reviewer_count = (
		select count(*)
        from reviewer_review_assignment
        where reviewer_review_assignment.paper_id = new.paper_id
    );
    if (reviewer_count > 3) then
		signal sqlstate '45000' set message_text = 'can not have more than 3 reviewer per paper';
	end if;
end;$$
delimiter ;