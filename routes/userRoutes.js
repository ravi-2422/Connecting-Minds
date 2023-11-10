const express = require('express');
const router = express.Router();
const {registerUser,loginUser, 
    userInfo, applyforMentor
} = require('../controllers/userControllers');
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/signin', loginUser);
router.post('/get-user-info-by-id', authMiddleware, userInfo);
router.post('/apply-for-mentor',authMiddleware, applyforMentor);


module.exports = router;