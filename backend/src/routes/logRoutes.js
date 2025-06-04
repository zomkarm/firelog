const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

// Apply to all log-related routes
router.use(apiKeyMiddleware);
router.post('/', logController.createLog);
router.get('/', logController.getAllLogs);
router.get('/:id', logController.getLogById);
router.get('/ip/:ip', logController.getLogsByIp);

module.exports = router;
