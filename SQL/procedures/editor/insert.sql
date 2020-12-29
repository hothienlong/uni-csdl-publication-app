 INSERT INTO `publication`.`paper` (`ID`, `TITLE`, `SUMMARY`, `ASSOCIATED_FILE`, `PAGE_COUNT`, `SENT_BY`, `SENT_DATE`, `STATUS`)
 VALUES ('daily4', 'What Did 2020 Do to Retail?', 'Summary', 'abc.txt', '30', 'author_1', '2020-12-10', 'UNSOLVED_REVIEW');
 
 
UPDATE paper SET page_count = '5' WHERE id = 'daily4';
