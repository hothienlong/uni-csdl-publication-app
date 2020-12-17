use publication;

drop trigger if exists author_editor;

delimiter $$
create trigger author_editor
after insert
on editor
for each row
begin
    declare found_user_as_author int;
    declare found_user_as_contact_author int;

    set found_user_as_author = (
        select count(s_id)
        from author
        where s_id = new.s_id
    );

    set found_user_as_contact_author = (
		select count(s_id)
		from contact_author
		where s_id = new.s_id
    );

    if(found_user_as_author > 0 or found_user_as_contact_author > 0) then
        signal sqlstate '45000' set message_text = 'Author/Editor policy is violated.';
	end if;
end;$$
delimiter ;
