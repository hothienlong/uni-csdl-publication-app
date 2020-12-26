use publication;
drop trigger if exists checkAssignReviewer;

delimiter |
create trigger checkAssignReviewer
before insert
on review_review_assignment for each row
begin
    if ((select count(*) from review_review_assignment as r where r.paper_id = new.paper_id) = 3) then
		signal sqlstate '45000' SET message_text = 'This paper already has three reviewer.';
	end if;
end |
delimiter ;