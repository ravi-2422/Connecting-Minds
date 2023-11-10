const express = require('express');
const router = express.Router();
const {registerUser,loginUser, 
    userInfo
} = require('../controllers/userControllers');
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/signin', loginUser);
router.post('/get-user-info-by-id', authMiddleware, userInfo);


module.exports = router;