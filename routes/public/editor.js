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
    return res.render('editor/DashBoard', {username: req.username});
});

router.get('/addPaper', (req, res) => {
    fetch('http://localhost:3000/api/editor/getContactAuthor')
        .then(response => response.json())
        .then(authors => res.render('editor/AddPaper', {authors: authors, username: req.username}))
});


router.get('/paper/:paperId', (req, res) => {
    let paperId = req.params.paperId;
    fetch('http://localhost:3000/api/editor/paper/' + paperId, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },        
        params: {paperId: paperId}
    })
        .then(response => response.json())
        .then(paper =>  res.render('editor/Paper', {paper: paper, username: req.username}))
        .catch((error) => {
            console.error('Error:', error);
        });    
});

router.post('/addPaper', (req, res) => {    
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


router.get('/allPapers', (req, res) => {    
    fetch('http://localhost:3000/api/editor/allPapers', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('editor/AllPapers', {data: data, username: req.username}))
        .catch(err => console.log(err));  
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
        .then(data => res.render('editor/PaperAssigned', {data: data, username: req.username}))
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
        .then(papers => res.render('editor/AssignReviewBefore', {papers: papers, username: req.username}))
        .catch(err => console.log(err));
});

router.post('/assignReviewBefore', (req, res) => {        
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
                        .then(response => response.json()),
                fetch('http://localhost:3000/api/editor/getReivewingDetailByPaper/' + paperId, {
                    method: 'GET',
                    headers: {
                        'authorization': req.cookies.authorization
                        }
                    })
                    .then(response => response.json())
                ]).then(result => {
                    console.log("assignReviewAfter: ", result);
                    res.render('editor/AssignReviewAfter', {result: result, paperId: paperId, username: req.username})
                })  
});

router.post('/assignReviewAfter', (req, res) => {  
    console.log('res form: ', req.body.reviewer);
    let reviewers = req.body.reviewer;
    let i;
    if (req.body.reviewer == undefined) {
        fetch('http://localhost:3000/api/editor/assignReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': req.cookies.authorization
                },
                body: JSON.stringify({reviewerId: reviewers, paperId: req.body.paperId, reviewDate: req.body.reviewing_date})
            })                
                .catch(err => console.log(err));  
        return res.redirect('/views/editor');   
    }
    if (typeof(reviewers) === 'string') {
        fetch('http://localhost:3000/api/editor/assignReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': req.cookies.authorization
                },
                body: JSON.stringify({reviewerId: reviewers, paperId: req.body.paperId, reviewDate: req.body.reviewing_date})
            })                
                .catch(err => console.log(err));  
    }
    else {
        for (i = 0; i < reviewers.length; ++i) {
            if (reviewers[i] != '-1') {
                fetch('http://localhost:3000/api/editor/assignReview', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': req.cookies.authorization
                    },
                    body: JSON.stringify({reviewerId: reviewers[i], paperId: req.body.paperId, reviewDate: req.body.reviewing_date})
                })                
                    .catch(err => console.log(err));  
            }
        }
    }

    return res.redirect('/views/editor');
});




router.get('/papersByTypeAndStatus', (req, res) => {    
    res.render('editor/PapersByTypeAndStatus', {username: req.username});
});



router.post('/papersByTypeAndStatus', (req, res) => {    
    return res.redirect('/views/editor/papersByTypeAndStatusResult?type='+req.body.typePaper + '&status=' + req.body.statusPaper);
});




router.get('/papersByTypeAndStatusResult', (req, res) => {    
    // console.log("query: ", req.query.type, req.query.status);
    let typePaper = req.query.type;
    let statusPaper = req.query.status;
    fetch('http://localhost:3000/api/editor/getPaperByTypeAndStatus/' + typePaper + '/' + statusPaper, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        params: {
            'typePaper': typePaper,
            'statusPaper': statusPaper
        }
    })
        .then(response => response.json())
        .then(data => res.render('editor/PapersByTypeAndStatusResult', {data: data, username: req.username}))
        .catch(err => console.log(err));
});




router.get('/papersPostedByTypeAndYears', (req, res) => {    
    res.render('editor/PapersPostedByTypeAndYear', {username: req.username});
});



router.post('/papersPostedByTypeAndYears', (req, res) => {    
    return res.redirect('/views/editor/papersPostedByTypeAndYearsResult?type='+req.body.typePaper + '&year=' + req.body.year);
});


router.get('/papersPostedByTypeAndYearsResult', (req, res) => {    
    // console.log("query: ", req.query.type, req.query.status);
    let typePaper = req.query.type;
    let distantYear = req.query.year;
    fetch('http://localhost:3000/api/editor/getPostedPaperByTypeAndYears/' + typePaper + '/' + distantYear, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        params: {
            'typePaper': typePaper,
            'statusPaper': distantYear
        }
    })
        .then(response => response.json())
        .then(data => res.render('editor/PapersPostedByTypeAndYearResult', {data: data, username: req.username}))
        .catch(err => console.log(err));
});



router.get('/papersByAuthorAndStatus', (req, res) => {    
    fetch('http://localhost:3000/api/editor/getAuthors', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(authors => res.render('editor/PapersByAuthorAndStatus', {authors: authors, username: req.username}))
        .catch(err => console.log(err));    
});



router.post('/papersByAuthorAndStatus', (req, res) => {    
    return res.redirect('/views/editor/papersByAuthorAndStatusResult?authorId='+req.body.authorId + '&status=' + req.body.statusPaper);
});


router.get('/papersByAuthorAndStatusResult', (req, res) => {    
    // console.log("query: ", req.query.type, req.query.status);
    let authorId = req.query.authorId;
    let statusPaper = req.query.status;
    fetch('http://localhost:3000/api/editor/getPapersByAuthorAndStatus/' + authorId + '/' + statusPaper, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        params: {
            'typePaper': authorId,
            'statusPaper': statusPaper
        }
    })
        .then(response => response.json())
        .then(data => res.render('editor/PapersByAuthorAndStatusResult', {data: data, username: req.username}))
        .catch(err => console.log(err));
});





module.exports = router;