const commentsController = require('../controllers/commentController');
var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.post('/', commentsController.commentsGet);

router.post('/createComment', commentsController.commentsCreate);

router.delete('/deletecomment', verifyToken, commentsController.commentDelete);

router.delete('/deleteCommentsPost', verifyToken, commentsController.commentsPostDelete);

module.exports = router;
