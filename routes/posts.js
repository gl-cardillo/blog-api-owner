const postsController = require('../controllers/postController');
var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.get('/', postsController.postGet);

router.post('/postId', postsController.postGetById);

router.get('/published', postsController.postPublishedGet);

router.get('/unpublished', postsController.postUnpublishedGet)

router.post('/createPost', verifyToken, postsController.postCreate);

router.delete('/deletePost', verifyToken, postsController.postDelete);

router.put('/updatePost', verifyToken, postsController.postUpdate);

router.put('/publishPost', verifyToken, postsController.postPublish);

router.put('/unpublishPost', verifyToken, postsController.postUnpublish);

module.exports = router;
