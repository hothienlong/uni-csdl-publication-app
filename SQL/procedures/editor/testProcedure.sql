use publication;
drop view if exists paper_detail;
create view paper_detail as
select r.reviewing_date, r.inform_date, r.result,
	   p.id, p.associated_file, p.page_count, p.sent_by, p.sent_date, p.title, p.summary,
       pu.doi, pu.open_access from paper as p inner join review_assignment_detail as r on p.id = r.p_id inner join publication_detail as pu on p.id = pu.p_id;
       
update paper_detail 
set sent_by = 'user_1'
where id = 'daily1';

set foreign_key_checks = 0;

use publication;

drop table if exists paper;

CREATE TABLE PAPER
(
	ID VARCHAR(45) PRIMARY KEY,
    TITLE TEXT NOT NULL,
    SUMMARY TEXT,
    ASSOCIATED_FILE TEXT NOT NULL,
    PAGE_COUNT INT NOT NULL,
    SENT_BY VARCHAR(45) NOT NULL,
    SENT_DATE DATE NOT NULL,
    STATUS ENUM ('UNRESOLVED_REVIEW','REVIEW', 'RESPOND_REVIEW', 'COMPLETE_REVIEW', 'PUBLICATION', 'POSTED') NOT NULL,
    foreign key (SENT_BY) references CONTACT_AUTHOR(S_ID) ON DELETE CASCADE ON UPDATE CASCADE
);


create table test(
	id int primary key,
	dtype enum('IP', 'TCP')
);
insert into test values (1,'IP');
insert into test values (2,'IP');
insert into test values (3,'TCP');

drop procedure if exists testEnum;
delimiter |
create procedure testEnum (value varchar(45))
begin
	if (value = 'IP') then
		select * from test where dtype = 'TCP';
    end if;
end |
delimiter ;

call testEnum('IP');




-- test Time diff

SELECT DATEDIFF('2003-12-20','2000-12-20');



call update_paper_status('daily1','REVIEW');

call editor_get_papers('user');

call get_posted_paper_by_years('RESEARCH_PAPER', 20);

grant execute on procedure publication.get_user_roles to authentication@localhost;