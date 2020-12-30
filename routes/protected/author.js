const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs_application',
    password : 'nodejs_application_password',
    database : 'publication'
});
connection.connect();

router.post('/submit_research_paper', (req, res)=>{
    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.user;

    var num_author = req.body.num_author;
    var write_authors_id = req.body.write_authors_id;

    var query = 'call submit_research_paper(?,?,?,?,?,?);';
    connection.query(
        query,
        [p_id, title, summary, associated_file, page_count, sent_by], 
        (err, results, fields)=>{
        if (err) return res.status(500).send(err);

        for(var i = 0; i < num_author; i++){
            var subquery = 'call add_author(?,?);'
            connection.query(
                subquery,
                [p_id, write_authors_id[i]],
                (err, results, fields)=>{
                    if (err) return res.status(500).send(err);
                }
            );
        }

        return res.sendStatus(200);
        }
    );
});


router.post('/submit_overview_paper', (req, res)=>{
    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.user;

    var num_author = req.body.num_author;
    var write_authors_id = req.body.write_authors_id;

    var query = 'call submit_overview_paper(?,?,?,?,?,?);';
    connection.query(
        query,
        [p_id, title, summary, associated_file, page_count, sent_by], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);

            for(var i = 0; i < num_author; i++){
                var subquery = 'call write_paper(?,?);'
                connection.query(
                    subquery,
                    [p_id, write_authors_id[i]],
                    (err, results, fields)=>{
                        if (err) return res.status(500).send(err);
                    }
                );
            }

            return res.sendStatus(200);
        }
    );
});

router.post('/submit_book_review', (req, res)=>{
    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.user;
    var ISBN = req.body.ISBN;

    var num_author = req.body.num_author;
    var write_authors_id = req.body.write_authors_id;
  
    var book_page_count = req.body.book_page_count;
    var publish_year = req.body.publish_year;
    var book_title = req.body.book_title;
    var publisher = req.body.publisher;
    
    var num_book_author = req.body.num_book_author;
    var book_author_name = req.body.book_author_name;

    // insert ignore add_book & add_book_author_name (if duplicate is no problem => nothing insert)
    var subsubquery = 'call add_book(?,?,?,?,?);';
    connection.query(
        subsubquery,
        [ISBN, book_page_count, publish_year, book_title, publisher], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);

            for(var i = 0; i<num_book_author; i++){
                var subquery = 'call add_book_author_name(?,?);'
                connection.query(
                    subquery,
                    [ISBN, book_author_name[i]],
                    (err, results, fields)=>{
                        if (err) return res.status(500).send(err);
                    }
                );
            }
        }
    );


    // transaction for procedure
    var query = 'call submit_book_review(?,?,?,?,?,?,?);';
    connection.query(
        query,
        [p_id, title, summary, associated_file, page_count, sent_by, ISBN], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);

            for(var i = 0; i < num_author; i++){
                // not duplicate if submit_book_review susscessful
                var subquery = 'call add_author(?,?);'
                connection.query(
                    subquery,
                    [p_id, write_authors_id[i]],
                    (err, results, fields)=>{
                        if (err) return res.status(500).send(err);
                    }
                );
            }

            return res.sendStatus(200);
        }
    );
});

router.get('/papers', (req, res)=>{
    var s_id = req.user;

    var query = 'call get_list_paper_in_for_years(?,?);';
    connection.query(
        query,
        [s_id, null], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            console.log(results);
            return res.send(results[0]);
        }
    );
 
});


// 12 chức năng author
router.put('/update_information', (req, res)=>{
    var s_id = req.user;
    var fname = req.body.fname;
    var address = req.body.address;
    var email = req.body.email;
    var company = req.body.company;
    var job = req.body.job;
    var degree = req.body.degree;
    var profession = req.body.profession;

    console.log(s_id);

    var query = 'call update_information_contact_author(?,?,?,?,?,?,?,?);';
    connection.query(
        query,
        [s_id, fname, address, email, company, job, degree, profession], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.sendStatus(200);
        }
    );
});

router.put('/edit_paper', (req, res)=>{
    var s_id = req.user;
    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.user;
    var sent_date = req.body.sent_date;

    var query = 'call edit_paper(?,?,?,?,?,?,?,?);';
    connection.query(
        query,
        [s_id, p_id, title, summary, associated_file, page_count, sent_by, sent_date], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.delete('/delete_paper', (req, res)=>{
    var s_id = req.user;
    var p_id = req.body.p_id;

    var query = 'call delete_paper(?,?);';
    connection.query(
        query,
        [s_id, p_id], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.post('/info_book_authors', (req, res)=>{
    var s_id = req.user;
    var p_id = req.body.p_id;

    var query = 'call get_information_book_authors(?,?);';
    connection.query(
        query,
        [s_id, p_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results[0]);
        }
    );
});

router.post('/status_paper', (req, res)=>{
    var s_id = req.user;
    var p_id = req.body.p_id;

    var query = 'call get_status_paper(?,?);';
    connection.query(
        query,
        [s_id, p_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            console.log(results);
            return res.send(results[0]);
        }
    );
});

router.post('/review_summary', (req, res)=>{
    var p_id = req.body.p_id;

    var query = 'call get_review_summary(?);';
    connection.query(
        query,
        [p_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results[0]);
        }
    );
});

router.post('/list_paper_in_years', (req, res)=>{
    var s_id = req.user;
    var years = req.body.years;

    var query = 'call get_list_paper_in_for_years(?, ?);';
    connection.query(
        query,
        [s_id, years], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results[0]);
        }
    );
});

router.post('/list_posted_paper_in_years', (req, res)=>{
    var s_id = req.user;
    var years = req.body.years;

    var query = 'call get_list_paper_with_status_for_years(?,?,?);';
    connection.query(
        query,
        [s_id, years, 'POSTED'], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results[0]);
        }
    );
});

router.post('/list_publication_paper_in_year', (req, res)=>{
    var s_id = req.user;
    var years = req.body.years;

    var query = 'call get_list_paper_with_status_for_years(?,?,?);';
    connection.query(
        query,
        [s_id, years, 'PUBLICATION'], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results[0]);
        }
    );
});

router.get('/papers_result', (req, res)=>{
    var s_id = req.user;

    var query = 'call get_papers_with_result(?,?);';
    connection.query(
        query,
        [s_id, null], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results[0]);
        }
    );
});
router.get('/papers_worst_result', (req, res)=>{
    var s_id = req.user;

    var query = 'call get_papers_with_result(?,?);';
    connection.query(
        query,
        [s_id, 'REJECTION'], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            console.log(results);
            return res.send(results[0]);
        }
    );
});

router.get('/papers_statistic', (req, res)=>{
    console.log("alo");
    var s_id = req.user;

    var query = 'call get_total_papers_in_years(?,?);';
    connection.query(
        query,
        [s_id, 10], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            console.log(results[0]);
            return res.send(results[0]);
        }
    );
});
router.post('/total_papers_in_years', (req, res)=>{
    var s_id = req.user;
    var years = req.body.years;

    var query = 'call get_total_papers_in_years(?, ?);';
    connection.query(
        query,
        [s_id, years], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results[0]);
        }
    );
});

router.post('/total_research_papers_in_years', (req, res)=>{
    var s_id = req.user;
    var years = req.body.years;

    var query = 'call get_total_papers_of_type_in_years(?,?,?);';
    connection.query(
        query,
        [s_id, 'Research', years], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            console.log("research : ",results);
            return res.send(results[0]);
        }
    );
});

router.post('/total_overview_papers_in_years', (req, res)=>{
    var s_id = req.user;
    var years = req.body.years;

    var query = 'call get_total_papers_of_type_in_years(?,?,?);';
    connection.query(
        query,
        [s_id, 'OverviewPaper', years], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results[0]);
        }
    );
});
module.exports = router;