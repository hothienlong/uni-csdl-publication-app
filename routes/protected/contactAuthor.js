const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'contact_author',
    password : 'contact_author_password',
    database : 'publication'
});
connection.connect();

router.post('/submit_research_paper', (req, res)=>{
    if(!req.privilege.paperSubmission) return res.sendStatus(401);

    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.user.username;

    var num_author = req.body.num_author;
    var write_authors_id = req.body.write_authors_id;

    var query = 'call submit_research_paper(?,?,?,?,?,?);';
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


router.post('/submit_overview_paper', (req, res)=>{
    if(!req.privilege.paperSubmission) return res.sendStatus(401);

    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.user.username;

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
    if(!req.privilege.paperSubmission) return res.sendStatus(401);
    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.user.username;
    var ISBN = req.body.ISBN;

    // var book_page_count = req.body.book_page_count;
    // var publish_year = req.body.publish_year;
    // var book_title = req.body.book_title; 
    // var publisher = req.body.publisher;

    // var author_name = req.body.author_name;

    var num_author = req.body.num_author;
    var write_authors_id = req.body.write_authors_id;

    var query = 'call submit_book_review(?,?,?,?,?,?,?);';
    connection.query(
        query,
        [p_id, title, summary, associated_file, page_count, sent_by,
        ISBN], 
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

router.get('/papers', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;

    var query = 'call contact_author_get_papers(?);';
    connection.query(
        query,
        [s_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
 
});


// 12 chức năng contact_author

router.put('/update_information', (req, res)=>{
    if(!req.privilege.updateAccount) return res.sendStatus(401);
    var s_id = req.user.username;
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
    if(!req.privilege.paperEdit) return res.sendStatus(401);
    var s_id = req.user.username;
    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.user.username;
    var sent_date = req.body.sent_date;

    var query = 'call edit_paper(?,?,?,?,?,?,?,?);';
    connection.query(
        query,
        [s_id, p_id, title, summary, associated_file, page_count, sent_by, sent_date], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            // paper = results[0];
            // if(paper[0] != null) {
            //     return res.send(paper);
            // }       
            // else {
            //     return res.send("Bài báo bạn muốn cập nhật không tồn tại.");
            // }
            return res.send(results);
        }
    );
});

router.delete('/delete_paper', (req, res)=>{
    if(!req.privilege.paperDelete) return res.sendStatus(401);
    var s_id = req.user.username;
    var p_id = req.body.p_id;

    var query = 'call delete_paper(?,?);';
    connection.query(
        query,
        [s_id, p_id], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            // paper = results[0];
            // console.log(results);
        
            // if(results[1].affectedRows != 0) {
            //     return res.send(paper);
            // }       
            // else {
            //     return res.send("Bài báo đang xóa không tồn tại.");
            // }
            return res.send(results);
        }
    );
});

router.get('/info_book_authors', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;
    var p_id = req.body.p_id;

    var query = 'call get_information_book_authors(?,?);';
    connection.query(
        query,
        [s_id, p_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.get('/status_paper', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;
    var p_id = req.body.p_id;

    var query = 'call get_status_paper(?,?);';
    connection.query(
        query,
        [s_id, p_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.get('/review_summary', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var p_id = req.body.p_id;

    var query = 'call get_review_summary(?);';
    connection.query(
        query,
        [p_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.get('/list_paper_in_one_year', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;

    var query = 'call get_list_paper_in_one_year(?);';
    connection.query(
        query,
        [s_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.get('/list_posted_paper_in_one_year', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;

    var query = 'call get_list_posted_paper_in_one_year(?);';
    connection.query(
        query,
        [s_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.get('/list_publication_paper_in_one_year', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;

    var query = 'call get_list_publication_paper_in_one_year(?);';
    connection.query(
        query,
        [s_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.get('/papers_worst_result', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;

    var query = 'call get_papers_worst_result(?);';
    connection.query(
        query,
        [s_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.get('/total_papers_in_5_years', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;

    var query = 'call get_total_papers_in_5_years(?);';
    connection.query(
        query,
        [s_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.get('/total_research_papers_in_5_years', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;

    var query = 'call get_total_research_papers_in_5_years(?);';
    connection.query(
        query,
        [s_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});

router.get('/total_overview_papers_in_5_years', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);
    var s_id = req.user.username;

    var query = 'call get_total_overview_papers_in_5_years(?);';
    connection.query(
        query,
        [s_id], 
            (err, results, fields)=>{
            if (err) return res.status(500).send(err);
            return res.send(results);
        }
    );
});
module.exports = router;