const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');

// Protect all admin routes
router.use(auth.verifyToken, auth.isAdmin);

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.delete('/users/:id', adminController.deleteUser);

// Log Management
router.get('/logs', adminController.getAllLogs);
router.get('/logs/:id', adminController.getLogById);
router.delete('/logs/:id', adminController.deleteLogById);

// Alerts
router.get('/alerts', adminController.getAllAlerts);
router.get('/alerts/:id', adminController.getAlertById);
router.delete('/alerts/:id', adminController.deleteAlertById);

// Stats (already done)
router.get('/stats/logs-count', adminController.getLogsCount);
router.get('/stats/top-users', adminController.getTopUsers);
router.get('/stats/ip-heatmap', adminController.getIPHeatmap);

router.get('/settings/', adminController.getProfile);
router.put('/settings/', adminController.setProfile);


module.exports = router;
