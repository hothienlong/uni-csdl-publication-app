const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
fetch.Promise = blueBird;
const jwt = require("jsonwebtoken");

router.use(express.static('public'));

router.get('/', (req, res) => {
    return res.render('reviewer/DashBoard' , {username: req.username})
});



router.get('/getPaperByType', (req,res) => {
    return res.render('reviewer/getPaperByType', {username: req.username})

})

router.post('/getPaperByType' ,(req,res) => {

    fetch('http://localhost:3000/api/reviewer/reviewer_get_paper_by_type', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body: JSON.stringify(req.body)
    })
    .then(res => res.json())
    .then(data => res.send(data))

})




router.get('/getPaperByTypeInYears', (req,res) => {
    return res.render('reviewer/getPaperByTypeInYears', {username: req.username})

})



router.post('/getPaperByTypeInYears' ,(req,res) => {

    fetch('http://localhost:3000/api/reviewer/get_reviewed_paper_by_type_in_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body: JSON.stringify(req.body)
    })
    .then(res => res.json())
    .then(data => res.send(data))

})


router.get('/getPaperOfAuthor', (req,res) => {
    return res.render('reviewer/getPaperOfAuthor', {username: req.username})

})


router.post('/getPaperOfAuthor' ,(req,res) => {

    fetch('http://localhost:3000/api/reviewer/reviewer_get_paper_of_author', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body: JSON.stringify(req.body)
    })
    .then(res => res.json())
    .then(data => res.send(data))
    // return res.send(req.body)

})



router.get('/getPaperOfAuthorInYears', (req,res) => {
    return res.render('reviewer/getPaperOfAuthorInYears', {username: req.username})

})



router.post('/getPaperOfAuthorInYears' ,(req,res) => {

    fetch('http://localhost:3000/api/reviewer/get_paper_of_author_in_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body: JSON.stringify(req.body)
    })
    .then(res => res.json())
    .then(data => res.send(data))
    // return res.send(req.body)

})

router.get('/getAuthorHadReviewMost', (req,res) => {
    fetch('http://localhost:3000/api/reviewer/reviewer_get_author_had_reviewed_most', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
    })
    .then(response => response.json())
    .then(data => res.render('reviewer/getAuthorHadReviewMost', {username: req.username , data: data[0]}))

})



router.get('/getResultReviewInYears', (req,res) => {
    return res.render('reviewer/getResultReviewInYears', {username: req.username})

})



router.post('/getResultReviewInYears' ,(req,res) => {

    fetch('http://localhost:3000/api/reviewer/get_result_review_in_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body: JSON.stringify(req.body)
    })
    .then(res => res.json())
    .then(data => res.send(data))
    // return res.send(req.body)

})


router.get('/getTopReviewPaperCountYears', (req,res) => {
    return res.render('reviewer/getTopReviewPaperCountYears', {username: req.username})
})


router.post('/getTopReviewPaperCountYears' ,(req,res) => {

    fetch('http://localhost:3000/api/reviewer/get_top_reviewed_paper_count_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body: JSON.stringify(req.body)
    })
    .then(res => res.json())
    .then(data => res.send(data))
})



router.get('/getBestResultPaper', (req,res) => {
    fetch('http://localhost:3000/api/reviewer/reviewer_get_best_result_paper', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
    })
    .then(response => response.json())
    .then(data => res.render('reviewer/getBestResultPaper', {username: req.username , data: data[0]}))
})

router.get('/getWorstResultPaper', (req,res) => {
    fetch('http://localhost:3000/api/reviewer/reviewer_get_worst_result_paper', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
    })
    .then(response => response.json())
    .then(data => res.render('reviewer/getWorstResultPaper', {username: req.username , data: data[0]}))
})


router.get('/getAvgPaperPerYears', (req,res) => {
    return res.render('reviewer/getAvgPaperPerYears', {username: req.username})
})




router.post('/getAvgPaperPerYears' ,(req,res) => {

    fetch('http://localhost:3000/api/reviewer/get_avg_reviewed_paper_count_per_year', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body: JSON.stringify(req.body)
    })
    .then(res => res.json())
    .then(data => res.send(data))
})



module.exports = router;