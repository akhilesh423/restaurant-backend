const express = require('express');
const UserGetItems = require('../controllers/userGetItems.js')

// const AdminMiddleware = require('../Middlewares/AdminMiddleware');

const router = express.Router();
router.get('/items', (req, res) => {
    UserGetItems(req, res)
});

module.exports = router;