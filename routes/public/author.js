const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
fetch.Promise = blueBird;

router.use(express.static('public'));


//---------------- Paper status ----------------
router.get('/', (req, res) => {
    return res.render('author/DashBoard', {username : req.username});
});

// router.get('/addPaper', (req, res) => {
//     fetch('http://localhost:3000/api/contactAuthor/getContactAuthor')
//         .then(response => response.json())
//         .then(authors => res.render('contactAuthor/addPaper', {authors}))
    
// });


// router.post('/addPaper', (req, res) => {
//     // console.log("type: ", typeof(req.body));
//     fetch('http://localhost:3000/api/editor/addPaper', {
//         method: 'POST', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': req.cookies.authorization
//         },
//         body: JSON.stringify(req.body)
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     res.redirect('/views/contactAuthor/paper')
// });


router.get('/paper', (req, res) => {
    // console.log(req.cookies.authorization);
    console.log("get paper");
    fetch('http://localhost:3000/api/author/papers', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaper', {data, username : req.username}))
        .catch(err => console.log(err));

});


router.post('/paper_in_x_years', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/list_paper_in_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaper', {data, username : req.username}))
        .catch(err => console.log(err));

});

router.post('/posted_paper_in_x_years', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/list_posted_paper_in_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaper', {data, username : req.username}))
        .catch(err => console.log(err));

});

router.post('/publication_papers', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/list_publication_paper_in_year', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaper', {data, username : req.username}))
        .catch(err => console.log(err));

});



//---------------- Paper result ----------------
router.get('/papers_result', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/papers_result', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaperResult', {data, username : req.username}))
        .catch(err => console.log(err));

});

router.get('/papers_worst_result', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/papers_worst_result', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaperResult', {data, username : req.username}))
        .catch(err => console.log(err));

});

//---------------- Paper statistic ----------------
router.get('/papers_statistic', (req, res) => {
    // console.log(req.cookies.authorization);
    console.log("alo public");
    fetch('http://localhost:3000/api/author/papers_statistic', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaperStatistic', {data, username : req.username}))
        .catch(err => console.log(err));

});

router.post('/total_papers_in_x_years', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/total_papers_in_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaperStatistic', {data, username : req.username}))
        .catch(err => console.log(err));

});

router.post('/total_research_papers_in_x_years', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/total_research_papers_in_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaperStatistic', {data, username : req.username}))
        .catch(err => console.log(err));

});

router.post('/total_overview_papers_in_x_years', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/total_overview_papers_in_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaperStatistic', {data, username : req.username}))
        .catch(err => console.log(err));

});

//---------------- Paper detail ----------------
router.get('/papers_detail', (req, res) => {
    return res.render('author/authorPaperDetail', {paper_status_result : "Unknown", username : req.username});
});

router.post('/papers_detail', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/status_paper', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(paper_status_result => res.render('author/authorPaperDetail', {paper_status_result, username : req.username}))
        .catch(err => console.log(err));

});

//---------------- Paper review result ----------------
// router.get('/papers_review_result', (req, res) => {
//     // console.log(req.cookies.authorization);
//     fetch('http://localhost:3000/api/author/papers_result', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': req.cookies.authorization
//         }
//     })
//         .then(response => response.json())
//         .then(data => res.render('author/authorPaperReviewResult', {data, username : req.username}))
//         .catch(err => console.log(err));
// });

//---------------- Paper review result ----------------
// router.get('/papers_author', (req, res) => {
//     // console.log(req.cookies.authorization);
//     fetch('http://localhost:3000/api/author/papers_statistic', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': req.cookies.authorization
//         }
//     })
//         .then(response => response.json())
//         .then(data => res.render('author/authorPaperReviewResult', {data, username : req.username}))
//         .catch(err => console.log(err));
// });
module.exports = router;
