const express = require('express');
const router = express.Router();
const {mentorInfo} = require('../controllers/mentorControllers');
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/mentor-info-by-id', authMiddleware, mentorInfo);

module.exports = router;

