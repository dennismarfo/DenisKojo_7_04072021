
// Import

const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const adminCtrl = require('../controllers/admin');

// Routes

router.get('/users', admin, adminCtrl.getAllUsersAdmin);
router.get('/users/:id', admin, adminCtrl.getOneUserAdmin);
router.delete('/users/:id', admin, adminCtrl.deleteOneUserAdmin);
router.put('/users/:id', admin, adminCtrl.modifyUserAdmin);


module.exports = router;