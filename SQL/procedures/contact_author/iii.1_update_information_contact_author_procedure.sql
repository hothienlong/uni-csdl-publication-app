-- - không cần thiết
use publication;

drop procedure if exists update_information_contact_author ;
delimiter $$
create procedure update_information_contact_author
(
	s_id varchar(45), fname text, address text, email text, company text , job text, degree text, profession text
)
begin
    
  update scientist s
  set s.fname = fname,
	    s.address = address,
      s.email = email,
      s.company = company,
      s.job = job,
      s.degree = degree,
      s.profession = profession
  where s.id = s_id;

end$$
delimiter ;

grant execute on procedure publication.update_information_contact_author to contact_author@localhost;

call update_information_contact_author('longauthor', 'ho thien long' , 'HCMUT1' , 'thienlong460@gmail.com' , Null , Null , Null, Null);