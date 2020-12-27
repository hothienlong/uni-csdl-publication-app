const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'authentication',
    password : 'authentication_password',
    database : 'publication'
});
connection.connect();

function getPrivilege(user, callback) {
    //Request and check user group
    const privilege = {
        updateAccount : false,
        paperSubmission : false,
        paperEdit : false,
        paperDelete: false,
        publicationInfoCreate: false,
        publicationInfoDelete: false,
        publicationInfoUpdate: false,
        reviewInfo: false,
        reviewEditorAssignment: false,
        reviewReviewerAssignment: false,
        review: false,
        getPaper: false,
        getPaperAll: false,
        getReview: false,
        getReviewAll: false,
        getAssignment: false,
        getAssignmentAll: false,
        modifyCriteria: false,
        viewCriteria: false,
    };
    //TODO update privileges
    let query = 'call get_user_roles(?);';
    connection.query(
        query,
        [user.username],
        (err, results,fields)=>{
            if(err)
            {
                callback(privilege);
                return;
            }
            privilege.updateAccount = true;

            let isAuthor = results[0][0].isAuthor>0;
            let isContactAuthor = results[0][0].isContactAuthor>0;
            let isReviewer = results[0][0].isReviewer>0;
            let isEditor = results[0][0].isEditor>0;
            
            if(isAuthor)
            {
                privilege.paperEdit = true;
                privilege.publicationInfoUpdate = true;
                privilege.getPaper = true;
                privilege.viewCriteria = true;

            }
            if(isContactAuthor)
            {
                privilege.paperSubmission = true;
                privilege.paperEdit = true;
                privilege.paperDelete = true;
                privilege.publicationInfoUpdate = true;
                privilege.getPaper = true;
                privilege.viewCriteria = true;
            }
            if(isReviewer)
            {
                privilege.review = true;
                privilege.getPaper = true;
                privilege.viewCriteria = true;
            }
            if(isEditor)
            {
                privilege.publicationInfoCreate = true;
                privilege.publicationInfoDelete = true;
                privilege.reviewInfo = true;
                privilege.reviewEditorAssignment = true;
                privilege.reviewReviewerAssignment = true;
                privilege.getPaper = true;
                privilege.getPaperAll = true;
                privilege.getReviewAll = true;
                privilege.modifyCriteria = true;
                privilege.viewCriteria = true;
            }

            callback(privilege);
        });
}

router.use((req, res, next)=>{
    const token = req.headers.authorization
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, 'JWR-TOKEN-SECRET-SHOULD-BE-STORED-IN-PROCESS-ENV', (err, user) => {
        if (err) return res.sendStatus(403);
        getPrivilege(user, (privilege)=>{
            req.user = user;
            req.privilege = privilege;
            next();
        });
    })
});

router.get('/',(req, res)=>{
    res.sendStatus(200);
});

// router.use('/author', require('./author'));
router.use('/contactAuthor', require('./contactAuthor'));
router.use('/reviewer', require('./reviewer'));
router.use('/editor', (req, res, next) => {
    req.user = jwt.decode(req.headers.authorization).username;
    next();
} ,require('./editor'));


module.exports = router;