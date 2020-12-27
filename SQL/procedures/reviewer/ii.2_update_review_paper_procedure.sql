use publication;

drop procedure if exists update_review_paper ;
delimiter $$
create procedure update_review_paper
(
	reviewer_id  varchar(45), paper_id varchar(45), note_for_author text, note_about_paper text
)
begin
	update  review_summary r
	set r.note_for_author = note_for_author,
		r.note_about_paper = note_about_paper
	where r.p_id = paper_id and r.reviewer_id = reviewer_id;

end$$
delimiter ;



grant execute on procedure publication.update_review_paper to reviewer@localhost;

call update_review_paper('qttho', '1' , 'note_for_author_update', 'note_for_paper')