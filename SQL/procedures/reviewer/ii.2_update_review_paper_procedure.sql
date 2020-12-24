use publication;

drop procedure if exists update_review_paper ;
delimiter $$
create procedure update_review_paper
(
	paper_id varchar(45), reviewing_date date, note text, inform_date date, result text
)
begin
	update  review_assignment_detail r
    set r.reviewing_date = reviewing_date,
		r.note = note,
		r.inform_date = inform_date,
        r.result = result
	where r.p_id = paper_id;

end$$
delimiter ;

call update_review_paper('1', '2020-12-24' , 'note1_update', '2020-12-25' , 'REJECTION')