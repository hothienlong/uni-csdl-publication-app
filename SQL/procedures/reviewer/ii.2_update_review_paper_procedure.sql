use publication;

drop procedure if exists update_review_paper ;
delimiter $$
create procedure update_review_paper
(
	paper_id varchar(45), reviewer_id  varchar(45), note_for_author text, note_for_paper text
)
begin
	update  review_summary r
	set r.note_for_author = note_for_author,
		r.note_for_paper = note_for_paper
	where r.p_id = paper_id and r.reviewer_id = reviewer_id;

end$$
delimiter ;

call update_review_paper('1', 'qttho' , 'note_for_author_update', 'note_for_paper')