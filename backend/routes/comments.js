const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../controllers/comments');

// Routes

router.post('/:post_id/comments', auth, commentCtrl.createComment);
router.get('/:post_id/comments', auth, commentCtrl.getAllComments);
router.delete('/:post_id/comments/:id', commentCtrl.deleteComments);


module.exports = router;