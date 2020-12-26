const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
fetch.Promise = blueBird;

router.use(express.static('public'));

router.get('/', (req, res) => {
    return res.render('editorDashboard');
});

router.get('/addPaper', (req, res) => {
    fetch('http://localhost:3000/api/editor/getContactAuthor')
        .then(response => response.json())
        .then(authors => res.render('addPaper', {authors}))
    
});


router.post('/addPaper', (req, res) => {
    // console.log("type: ", typeof(req.body));
    fetch('http://localhost:3000/api/editor/addPaper', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body: JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    res.redirect('/views/editor/paper')
});


router.get('/paper', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/editor/allPapers', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('editorPaper', {data}))
        .catch(err => console.log(err));
    // return res.render('editorPaper');
});


router.get('/paperAssigned', (req, res) => {
    console.log(req.headers.cookie);
    fetch('http://localhost:3000/api/editor/allPapersAssigned', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('editorPaperAssigned', {data}))
        .catch(err => console.log(err));
});


router.get('/paper/:paperId', (req, res) => {
    fetch('http://localhost:3000/api/editor/paper/' + toString(req.params.paperId), {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body: JSON.stringify(req.body),
        params: req.params.paperId
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    res.redirect('/views/editor/paper')
});



module.exports = router;