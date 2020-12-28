create user author@localhost identified by 'author_password';
create user reviewer@localhost identified by 'reviewer_password';
create user editor@localhost identified by 'editor_password';

grant insert, delete, update, select on review_assignment_detail to editor@localhost;
grant select on review_assignment_detail to author@localhost;
grant select on review_assignment_detail to reviewer@localhost;

grant insert, delete on editor_review_assignment to editor@localhost;
grant insert, delete, select on reviewer_review_assignment to editor@localhost;
grant select on reviewer_review_assignment to reviewer@localhost;

grant update (status) on paper to editor@localhost;
grant select (status) on paper to author@localhost;

grant insert on publication_detail to editor@localhost;
grant update (DOI) on publication_detail to editor@localhost;

grant select on paper to author@localhost;
grant select on research_paper to author@localhost;
grant select on research_overview_paper to author@localhost;
grant select on book_review to author@localhost;

grant select on paper to reviewer@localhost;
grant select on research_paper to reviewer@localhost;
grant select on research_overview_paper to reviewer@localhost;
grant select on book_review to reviewer@localhost;

grant select on paper to editor@localhost;
grant select on research_paper to editor@localhost;
grant select on research_overview_paper to editor@localhost;
grant select on book_review to editor@localhost;

grant select on paper_authors to author@localhost;
grant select on paper_authors to reviewer@localhost;