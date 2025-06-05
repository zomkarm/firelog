const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware'); // We'll assume it validates JWT and sets req.user

// Protect all routes with auth
router.use(authMiddleware.verifyToken, authMiddleware.isClient);

// router.get('/', function(req,res){
//     res.json({ message: 'Note deleted' });
// });


router.get('/settings/', clientController.getProfile);
router.put('/settings/', clientController.setProfile);


// // Dashboard Config
router.get('/config', clientController.getConfig);
router.put('/config', clientController.updateConfig);

// // Optional: Account Deletion
router.delete('/account', clientController.deleteAccount);

router.get('/apikey',clientController.getApiKey);
router.put('/apikey',clientController.setApiKey);

//Logs
router.get('/logs/stats', clientController.getLogStats);
router.get('/logs',clientController.getAllLogs);

//Alerts
router.get('/alerts',clientController.getAllAlerts);

module.exports = router;
