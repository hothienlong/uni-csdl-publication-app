use publication;

drop procedure if exists createReviewDetail;
drop procedure if exists assignEditor;
drop procedure if exists assignReviewer;
drop procedure if exists removeEditorAssignment;
drop procedure if exists removeReviewerAssignment;

delimiter $$
create procedure createReviewDetail
(paperId varchar(45),
reviewingDate date)
begin
	insert into review_assignment_detail(p_id, reviewing_date) values(paperId, reviewingDate);
end$$

create procedure assignEditor
(paperId varchar(45),
editorId varchar(45))
begin
	insert into editor_review_assignment(editor_id, paper_id) values(editorId, paperId);
end$$

create procedure assignReviewer
(paperId varchar(45),
reviewerId varchar(45))
begin
	insert into review_review_assignment(reviewer_id, paper_id) values(reviewerId, paperId);
end$$

create procedure removeEditorAssignment
(paperId varchar(45),
editorId varchar(45))
begin
	delete from editor_review_assignment where editor_id = editorId and paper_id = paperId;
end$$

create procedure removeReviewerAssignment
(paperId varchar(45),
reviewerId varchar(45))
begin
	delete from editor_review_assignment where reviewer_id = reviewerId and paper_id = paperId;
end$$
delimiter ;

grant execute on procedure publication.createReviewDetail to editor@localhost;
grant execute on procedure publication.assignEditor to editor@localhost;
grant execute on procedure publication.assignReviewer to editor@localhost;
grant execute on procedure publication.removeEditorAssignment to editor@localhost;
grant execute on procedure publication.removeReviewerAssignment to editor@localhost;