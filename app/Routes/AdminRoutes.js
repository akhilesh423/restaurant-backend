const express = require('express');
const AdminSignup = require('../Controllers/AdminSignup.js');
const AdminSignin = require('../Controllers/Adminsignin.js')
const AdminAddItem = require('../Controllers/AdminAddItem.js')
const AdminGetItems = require('../Controllers/AdminGetItems.js')

const AdminMiddleware = require('../Middlewares/AdminMiddleware');

const router = express.Router();
router.post('/signup', (req, res) => {
    AdminSignup(req, res)
});

router.post('/signin', (req, res) => {
    AdminSignin(req, res)
});

router.post('/additems', AdminMiddleware, AdminAddItem);
router.get('/getItems', AdminMiddleware, AdminGetItems)

module.exports = router;
