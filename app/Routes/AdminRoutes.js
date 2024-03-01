const express = require('express');
const adminSignup = require('../controllers/adminSignup.js');
const adminSignin = require('../controllers/adminsignin.js')
const adminAddItem = require('../controllers/adminAddItem.js')
const adminGetItems = require('../controllers/adminGetItems.js')
const adminMiddleware = require('../middlewares/adminMiddleware.js');

const multer = require("multer")
const upload = multer({ dest: "uploads/" });

const router = express.Router();
router.post('/signup', (req, res) => {
    adminSignup(req, res)
});

router.post('/signin', (req, res) => {
    adminSignin(req, res)
});

router.post('/additem', adminMiddleware, upload.single("itemImage"), adminAddItem);
router.get('/getItems', adminMiddleware, adminGetItems)

module.exports = router;
