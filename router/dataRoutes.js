// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const { startSimulation, stopSimulation, getHistory } = require('../controller/dataController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/start', authenticateUser, startSimulation);
router.post('/stop', authenticateUser, stopSimulation);
router.get('/history', authenticateUser, getHistory);

module.exports = router;
