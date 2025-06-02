const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/', logController.createLog);
router.get('/', logController.getAllLogs);
router.get('/:id', logController.getLogById);
router.get('/ip/:ip', logController.getLogsByIp);

module.exports = router;
