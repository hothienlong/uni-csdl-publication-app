use publication;

grant insert, update, delete on publication.publication_detail to editor@localhost;
grant insert, update, delete on publication.review_assigment_detail to editor@localhost;
grant insert, delete on publication.editor_review_assignment to editor@localhost;
grant insert, delete on publication.reviewer_review_assignment to editor@localhost;