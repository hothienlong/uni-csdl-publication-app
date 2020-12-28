const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
const { reject } = require('bluebird');
fetch.Promise = blueBird;

router.use(express.static('public'));

router.get('/', (req, res) => {
    return res.render('editor/editorDashboard');
});

router.get('/addPaper', (req, res) => {
    fetch('http://localhost:3000/api/editor/getContactAuthor')
        .then(response => response.json())
        .then(authors => res.render('editor/addPaper', {authors}))
    
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
        .then(data => res.render('editor/editorAllPapers', {data}))
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
        .then(data => res.render('editor/editorPaperAssigned', {data}))
        .catch(err => console.log(err));
});


router.get('/assignReviewBefore', (req, res) => {  
    fetch('http://localhost:3000/api/editor/allPapers', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(papers => res.render('editor/assignReviewBefore', {papers}))
        .catch(err => console.log(err));
});

router.post('/assignReviewBefore', (req, res) => { 
    
    // fetch('http://localhost:3000/api/editor/getReviewerByPaper/' + req.body.paperId, {
    //     method: 'GET',
    //     headers: {
    //         'authorization': req.cookies.authorization
    //     }
    // })
    //     .then(response => response.json())
    //     .then(reviewers => res.render('assignReviewAfter', {reviewers, paper}))
    //     .catch(err => console.log(err));
    return res.redirect('/views/editor/assignReviewAfter?paperId='+req.body.paperId);
});


router.get('/assignReviewAfter', (req, res) => {  
    // console.log("paper id: ", req.query.paperId);
    paperId = req.query.paperId;

    Promise.all([fetch('http://localhost:3000/api/editor/getReviewerByPaper/' + paperId, {
                    method: 'GET',
                    headers: {
                        'authorization': req.cookies.authorization
                        }
                    })
                    .then(response => response.json()),
                fetch('http://localhost:3000/api/editor/getAllReviewers', {
                        method: 'GET',
                        headers: {
                            'authorization': req.cookies.authorization
                            }
                        })
                        .then(response => response.json())
                ]).then(result => {
                    console.log("res: ", result);
                    res.render('editor/assignReviewAfter', {result, paperId})
                })  
});

router.post('/assignReviewAfter', (req, res) => {  
    if (req.body.reviewer1 !== undefined) {
        // let res = await new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/editor/assignReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': req.cookies.authorization
                },
                body: JSON.stringify({reviewerId: req.body.reviewer1, paperId: req.body.paperId, reviewDate: req.body.reviewing_date})
            })                
                .catch(err => console.log(err));    
            // }); 
    } 
    if (req.body.reviewer2 !== undefined) {
        // let res = await new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/editor/assignReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': req.cookies.authorization
                },
                body: JSON.stringify({reviewerId: req.body.reviewer2, paperId: req.body.paperId, reviewDate: req.body.reviewing_date})
            })                
                .catch(err => console.log(err));    
            // });             
    } 
    if (req.body.reviewer3 !== undefined) {
        // let res = await new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/editor/assignReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': req.cookies.authorization
                },
                body: JSON.stringify({reviewerId: req.body.reviewer3, paperId: req.body.paperId, reviewDate: req.body.reviewing_date})
            })                
                .catch(err => console.log(err));    
            // }); 
    }
    return res.redirect('/views/editor');
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