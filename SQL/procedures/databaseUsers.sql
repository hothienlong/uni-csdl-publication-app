use publication;

CREATE USER author@localhost IDENTIFIED WITH mysql_native_password BY 'author_password';
CREATE USER contact_author@localhost IDENTIFIED WITH mysql_native_password BY 'contact_author_password';
CREATE USER editor@localhost IDENTIFIED WITH mysql_native_password BY 'editor_password';
CREATE USER reviewer@localhost IDENTIFIED WITH mysql_native_password BY 'reviewer_password';
