const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const cors = require ('cors');

router.options('/signup', cors());

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/me', multer, userCtrl.modifyUser);
router.get('/me', auth, userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.delete);

module.exports = router;