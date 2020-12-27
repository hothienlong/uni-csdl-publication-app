use publication;
drop view if exists research_papers;
create view research_papers as
select * from publication.paper
inner join publication.research_paper on paper.id = research_paper.p_id;

drop view if exists overview_papers;
create view overview_papers as
select * from publication.paper
inner join publication.research_overview_paper on paper.id = research_overview_paper.p_id;

drop view if exists book_review_papers;
create view book_review_papers as
select * from publication.paper
inner join publication.book_review on paper.id = book_review.p_id;