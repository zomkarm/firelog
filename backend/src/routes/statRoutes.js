const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');

router.get('/logs-count', statController.getLogStats);
router.get('/top-users', statController.getTopSuspiciousUsers);
router.get('/ip-heatmap', statController.getIpHeatmapData);

module.exports = router;
