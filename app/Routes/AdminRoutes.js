const express = require('express');
const AdminSignup = require('../Controllers/AdminSignup.js');
const AdminSignin = require('../Controllers/Adminsignin.js')
const AdminAddItem = require('../Controllers/AdminAddItem.js')

const AdminMiddleware = require('../Middlewares/AdminMiddleware');

const router = express.Router();
router.post('/signup', (req, res) => {
    AdminSignup(req, res)
});

router.post('/signin', (req, res) => {
    AdminSignin(req, res)
})

router.post('/additems', AdminMiddleware, AdminAddItem);

module.exports = router;
