const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
fetch.Promise = blueBird;
var {validationResult, check} = require('express-validator');

router.use(express.static('public'));


//---------------- Profile ----------------
router.get('/profile', (req, res) => {
    return res.render('author/Profile', {username : req.username});
});

router.post('/update_profile', (req, res) => {
    // console.log(req.cookies.authorization);
    console.log("update profile");
    fetch('http://localhost:3000/api/author/update_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => console.log("Success : ",response.status))
        .catch((error) => {
            console.error('Error:', error);
        });
    res.redirect('/views/author/Profile');

});
//---------------- Papers ----------------
router.get('/', (req, res) => {
    return res.render('author/DashBoard', {username : req.username});
});

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

//---------------- Submit paper ----------------
router.get('/addResearchPaper', (req, res) => {

        fetch('http://localhost:3000/api/author/authors', {
            method: 'GET',
            headers: {
                'authorization': req.cookies.authorization
            }
        })
            .then(response => response.json())
            .then(authors => res.render('author/addResearchPaper', {authors, username : req.username}))
            .catch(err => console.log(err));
    });

router.post('/addResearchPaper', [check('p_id').notEmpty().withMessage('Id cannot be empty'),
                                check('title').notEmpty().withMessage('Title cannot be empty'),
                                check('associated_file').notEmpty().withMessage('File cannot be empty'),
                                check('page_count').notEmpty().withMessage('Number of pages cannot be empty'),
                                check('num_author').notEmpty().withMessage('Number of authors cannot be empty'),
                                check('write_authors_id').notEmpty().withMessage('Paper authors cannot be empty')],
    (req, res) => {

        
        let errors = validationResult(req).array(); 

        if (req.body.page_count < 10 || req.body.page_count > 20) {
            errors.push({
                value: '',
                msg: 'Research paper must have 10 to 20 pages!',
                param: 'wrong_page_count',
                location: 'body'
            });
        }

        if (req.body.num_author != req.body.write_authors_id.length) {
            errors.push({
                value: '',
                msg: 'Paper authors not same number of authors!',
                param: 'wrong_num_author',
                location: 'body'
            });
        }

        const alert = errors;

        if (alert.length > 0) {

            // console.log(alert);
            fetch('http://localhost:3000/api/author/authors', {
                method: 'GET',
                headers: {
                    'authorization': req.cookies.authorization
                }
            })
                .then(response => response.json())
                .then(authors => res.render('author/addResearchPaper', {alert, authors, username : req.username}))
                .catch(err => console.log(err));
            return;
        }

        // console.log(document.getElementsByName('page_count').value);
        // if(document.getElementsByName('page_count').value == )

        console.log("add research");
        fetch('http://localhost:3000/api/author/submit_research_paper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': req.cookies.authorization
            },
            body: JSON.stringify(req.body)
        })
            .then(response => console.log("Success : ",response.status))
            .catch((error) => {
                console.error('Error:', error);
            });
        res.redirect('/views/author/addResearchPaper');
    });

router.get('/addBookReviewPaper', (req, res) => {
    fetch('http://localhost:3000/api/author/authors', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(authors => res.render('author/addBookReviewPaper', {authors, username : req.username}))
        .catch(err => console.log(err));
});

router.get('/addResearchOverviewPaper', (req, res) => {
    console.log("get research overview");
    fetch('http://localhost:3000/api/author/authors', {
        method: 'GET',
        headers: {
            'authorization': req.cookies.authorization
        }
    })
        .then(response => response.json())
        .then(authors => res.render('author/addResearchOverviewPaper', {authors, username : req.username}))
        .catch(err => console.log(err));
});

router.post('/addResearchOverviewPaper', [check('p_id').notEmpty().withMessage('Id cannot be empty'),
                                        check('title').notEmpty().withMessage('Title cannot be empty'),
                                        check('associated_file').notEmpty().withMessage('File cannot be empty'),
                                        check('page_count').notEmpty().withMessage('Number of pages cannot be empty'),
                                        check('num_author').notEmpty().withMessage('Number of authors cannot be empty'),
                                        check('write_authors_id').notEmpty().withMessage('Paper authors cannot be empty')],
     (req, res) => {
        let errors = validationResult(req).array(); 

        if (req.body.page_count < 3 || req.body.page_count > 10) {
            errors.push({
                value: '',
                msg: 'Research paper must have 10 to 20 pages!',
                param: 'wrong_page_count',
                location: 'body'
            });
        }

        if (req.body.num_author != req.body.write_authors_id.length) {
            errors.push({
                value: '',
                msg: 'Paper authors not same number of authors!',
                param: 'wrong_num_author',
                location: 'body'
            });
        }

        const alert = errors;

        if (alert.length > 0) {

            // console.log(alert);
            fetch('http://localhost:3000/api/author/authors', {
                method: 'GET',
                headers: {
                    'authorization': req.cookies.authorization
                }
            })
                .then(response => response.json())
                .then(authors => res.render('author/addResearchOverviewPaper', {alert, authors, username : req.username}))
                .catch(err => console.log(err));
            return;
        }

        console.log("add research overview");
        fetch('http://localhost:3000/api/author/submit_overview_paper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': req.cookies.authorization
            },
            body: JSON.stringify(req.body)
        })
            .then(response => console.log("Success : ",response.status))
            .catch((error) => {
                console.error('Error:', error);
            });
        res.redirect('/views/author/addResearchOverviewPaper');
    });

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

//---------------- Edit paper ----------------
router.get('/edit_paper', (req, res) => {
    return res.render('author/editPaper', {username : req.username});
});

router.post('/edit_paper', [check('p_id').notEmpty().withMessage('Id cannot be empty'),
                        check('title').notEmpty().withMessage('Title cannot be empty'),
                        check('associated_file').notEmpty().withMessage('File cannot be empty'),
                        check('page_count').notEmpty().withMessage('Number of pages cannot be empty')], 
                        
    (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const alert = errors.array()
            // console.log(alert);
            res.render('author/editPaper', {alert, username : req.username});
            return;
        }

        console.log("edit paper");
        fetch('http://localhost:3000/api/author/edit_paper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': req.cookies.authorization
            },
            body: JSON.stringify(req.body)
        })
        .then(response => console.log("Success : ",response.status))
        .catch((error) => {
            console.error('Error:', error);
        });
        res.redirect('/views/author/edit_paper');

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

// router.post('/papers_detail', (req, res) => {
//     // console.log(req.cookies.authorization);
//     fetch('http://localhost:3000/api/author/status_paper', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': req.cookies.authorization
//         },
//         body : JSON.stringify(req.body)
//     })
//         .then(response => response.json())
//         .then(paper_status_result => res.render('author/authorPaperDetail', {paper_status_result, username : req.username}))
//         .catch(err => console.log(err));

// });

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
router.get('/paper_review_result', (req, res) => {
    return res.render('author/authorPaperReviewResult', {data : [], username : req.username});
});
router.post('/paper_review_result', (req, res) => {
    // console.log(req.cookies.authorization);
    fetch('http://localhost:3000/api/author/review_summary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaperReviewResult', {data, username : req.username}))
        .catch(err => console.log(err));
});

//---------------- Paper author ----------------
router.get('/papers_author', (req, res) => {
    return res.render('author/authorPaperAuthor', {data : [], username : req.username});
});

router.post('/papers_author', (req, res) => {
    // console.log(req.cookies.authorization);
    console.log("paper author");
    fetch('http://localhost:3000/api/author/info_book_authors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies.authorization
        },
        body : JSON.stringify(req.body)
    })
        .then(response => response.json())
        .then(data => res.render('author/authorPaperAuthor', {data, username : req.username}))
        .catch(err => console.log(err));
});
module.exports = router;
