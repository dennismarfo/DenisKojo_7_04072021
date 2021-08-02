const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/posts');
const multer = require('../middleware/multer-config-attach');

// Routes
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/:id', postCtrl.getOnePost);


module.exports = router;