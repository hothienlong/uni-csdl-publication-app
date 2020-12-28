drop trigger if exists review_result_update;

delimiter $$
create trigger review_result_update
after update
on review_assignment_detail
for each row
begin
	declare reviewer_count int;
	if(new.result is not null) then
		set reviewer_count = (
			select count(*)
			from reviewer_review_assignment
			where reviewer_review_assignment.paper_id = new.p_id
		);
        if (reviewer_count = 0) then
			signal sqlstate '45000' set message_text = 'can not update paper review result without having some reviewer review it.';
		end if;
    end if;
end;$$
delimiter ;