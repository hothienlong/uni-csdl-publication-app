use publication;

drop procedure if exists update_information_reviewer ;
delimiter $$
create procedure update_information_reviewer
(
	reviewer_id varchar(45) , collaboration_day date, work_email varchar(45), fname text, address text, email text, company text , job text, degree text, profession text
)
begin

	update reviewer r
    set r.collaboration_date = collaboration_day ,
		r.work_email = work_email
	where r.s_id = reviewer_id;
    
  update scientist s
  set s.fname = fname,
  s.address = address,
      s.email = email,
      s.company = company,
      s.job = job,
      s.degree = degree,
      s.profession = profession
  where s.id = reviewer_id;

end$$
delimiter ;

call update_information_reviewer('qttho','2020-12-20', 'qttho@gmail.com', 'Quan Thanh Tho' , 'HCMUT1' , 'thoquan@gmail.com' , 'BKU' , 'Dev' , 'Professor' , 'Science')