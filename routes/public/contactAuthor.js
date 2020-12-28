const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
const { reject } = require('bluebird');
const { body } = require('express-validator');
fetch.Promise = blueBird;

router.use(express.static('public'));

//---------------- Paper status ----------------
router.get('/', (req, res) => {
    return res.render('contactAuthor/contactAuthorDashboard');
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
    fetch('http://localhost:3000/api/contactAuthor/papers', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('contactAuthor/contactAuthorPaper', {data}))
        .catch(err => console.log(err));

});


router.post('/paper_in_x_years', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/contactAuthor/list_paper_in_x_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('contactAuthor/contactAuthorPaper', {data}))
        .catch(err => console.log(err));

});

router.post('/posted_paper_in_x_years', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/contactAuthor/list_posted_paper_in_x_years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('contactAuthor/contactAuthorPaper', {data}))
        .catch(err => console.log(err));

});

router.get('/publication_papers', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/contactAuthor/list_publication_paper', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('contactAuthor/contactAuthorPaper', {data}))
        .catch(err => console.log(err));

});



//---------------- Paper status ----------------
router.get('/paper_status', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/contactAuthor/papers', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('contactAuthor/contactAuthorPaperResult', {data}))
        .catch(err => console.log(err));

});

router.get('/papers_result', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/contactAuthor/papers_result', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('contactAuthor/contactAuthorPaperResult', {data}))
        .catch(err => console.log(err));

});

router.get('/papers_worst_result', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/contactAuthor/papers_worst_result', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(data => res.render('contactAuthor/contactAuthorPaperResult', {data}))
        .catch(err => console.log(err));

});

// router.get('/paperAssigned', (req, res) => {
//     console.log(req.headers.cookie);
//     fetch('http://localhost:3000/api/editor/allPapersAssigned', {
//         method: 'GET',
//         headers: {
//             'authorization': req.cookies.authorization
//         }
//     })
//         .then(response => response.json())
//         .then(data => res.render('editor/editorPaperAssigned', {data}))
//         .catch(err => console.log(err));
// });


// router.get('/assignReviewBefore', (req, res) => {  
//     fetch('http://localhost:3000/api/editor/allPapers', {
//         method: 'GET',
//         headers: {
//             'authorization': req.cookies.authorization
//         }
//     })
//         .then(response => response.json())
//         .then(papers => res.render('editor/assignReviewBefore', {papers}))
//         .catch(err => console.log(err));
// });

// router.post('/assignReviewBefore', (req, res) => { 
    
    // fetch('http://localhost:3000/api/editor/getReviewerByPaper/' + req.body.paperId, {
    //     method: 'GET',
    //     headers: {
    //         'authorization': req.cookies.authorization
    //     }
    // })
    //     .then(response => response.json())
    //     .then(reviewers => res.render('assignReviewAfter', {reviewers, paper}))
    //     .catch(err => console.log(err));
//     return res.redirect('/views/contactAuthor/assignReviewAfter?paperId='+req.body.paperId);
// });


// router.get('/assignReviewAfter', (req, res) => {  
//     // console.log("paper id: ", req.query.paperId);
//     paperId = req.query.paperId;

//     Promise.all([fetch('http://localhost:3000/api/editor/getReviewerByPaper/' + paperId, {
//                     method: 'GET',
//                     headers: {
//                         'authorization': req.cookies.authorization
//                         }
//                     })
//                     .then(response => response.json()),
//                 fetch('http://localhost:3000/api/editor/getAllReviewers', {
//                         method: 'GET',
//                         headers: {
//                             'authorization': req.cookies.authorization
//                             }
//                         })
//                         .then(response => response.json())
//                 ]).then(result => {
//                     console.log("res: ", result);
//                     res.render('editor/assignReviewAfter', {result, paperId})
//                 })  
// });

// router.post('/assignReviewAfter', (req, res) => {  
//     if (req.body.reviewer1 !== undefined) {
//         // let res = await new Promise((resolve, reject) => {
//             fetch('http://localhost:3000/api/editor/assignReview', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'authorization': req.cookies.authorization
//                 },
//                 body: JSON.stringify({reviewerId: req.body.reviewer1, paperId: req.body.paperId, reviewDate: req.body.reviewing_date})
//             })                
//                 .catch(err => console.log(err));    
//             // }); 
//     } 
//     if (req.body.reviewer2 !== undefined) {
//         // let res = await new Promise((resolve, reject) => {
//             fetch('http://localhost:3000/api/editor/assignReview', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'authorization': req.cookies.authorization
//                 },
//                 body: JSON.stringify({reviewerId: req.body.reviewer2, paperId: req.body.paperId, reviewDate: req.body.reviewing_date})
//             })                
//                 .catch(err => console.log(err));    
//             // });             
//     } 
//     if (req.body.reviewer3 !== undefined) {
//         // let res = await new Promise((resolve, reject) => {
//             fetch('http://localhost:3000/api/editor/assignReview', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'authorization': req.cookies.authorization
//                 },
//                 body: JSON.stringify({reviewerId: req.body.reviewer3, paperId: req.body.paperId, reviewDate: req.body.reviewing_date})
//             })                
//                 .catch(err => console.log(err));    
//             // }); 
//     }
//     return res.redirect('/views/contactAuthor');
// });





// router.get('/paper/:paperId', (req, res) => {
//     fetch('http://localhost:3000/api/editor/paper/' + toString(req.params.paperId), {
//         method: 'POST', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': req.cookies.authorization
//         },
//         body: JSON.stringify(req.body),
//         params: req.params.paperId
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



module.exports = router;