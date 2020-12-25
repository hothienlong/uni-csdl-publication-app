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
    var sent_by = req.body.sent_by;
    var sent_date = req.body.sent_date;

    var query = 'call submit_research_paper(?,?,?,?,?,?,?);';
    connection.query(
        query,
        [p_id, title, summary, associated_file, page_count, sent_by, sent_date], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);
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
    var sent_by = req.body.sent_by;
    var sent_date = req.body.sent_date;
    var query = 'call submit_overview_paper(?,?,?,?,?,?,?);';
    connection.query(
        query,
        [p_id, title, summary, associated_file, page_count, sent_by, sent_date], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);
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
    var sent_by = req.body.sent_by;
    var sent_date = req.body.sent_date;

    var ISBN = req.body.ISBN;
    var book_page_count = req.body.book_page_count;
    var publish_year = req.body.publish_year;
    var book_title = req.body.book_title; 
    var publisher = req.body.publisher;

    var author_name = req.body.author_name;

    var query = 'call submit_book_review(?,?,?,?,?,?,?, ?,?,?,?,?, ?);';
    connection.query(
        query,
        [p_id, title, summary, associated_file, page_count, sent_by, sent_date,
        ISBN, book_page_count, publish_year, book_title, publisher,
        author_name], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);
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

router.put('/edit_paper', (req, res)=>{
    if(!req.privilege.paperSubmission) return res.sendStatus(401);
    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.user.username;
    var sent_date = req.body.sent_date;

    var query = 'call edit_paper(?,?,?,?,?,?,?);';
    connection.query(
        query,
        [p_id, title, summary, associated_file, page_count, sent_by, sent_date], 
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
    if(!req.privilege.getPaper) return res.sendStatus(401);
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
module.exports = router;