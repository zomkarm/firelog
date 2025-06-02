const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/auth'); // We'll assume it validates JWT and sets req.user

// Protect all routes with auth
router.use(authMiddleware.verifyToken, authMiddleware.isClient);

// Dashboard Config
router.get('/config', clientController.getConfig);
router.put('/config', clientController.updateConfig);

// Optional: Account Deletion
router.delete('/account', clientController.deleteAccount);

module.exports = router;
