// src/routes/alertRoutes.js
const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

// Apply to all log-related routes
router.use(apiKeyMiddleware);

router.post('/', alertController.createAlert);
router.get('/', alertController.getAllAlerts);
router.get('/:id', alertController.getAlertById);
router.delete('/:id', alertController.deleteAlert);

module.exports = router;
