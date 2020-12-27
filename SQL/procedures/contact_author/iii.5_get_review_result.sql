use publication;
drop procedure if exists get_review_summary;

delimiter $$
create procedure get_review_summary
(
	p_id varchar(45)
)
begin
	select *
    from review_summary rs
    where rs.p_id = p_id;
end$$
delimiter ;

grant execute on procedure get_review_result to contact_author@localhost;

call get_review_summary(3);

