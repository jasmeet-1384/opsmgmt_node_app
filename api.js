import authController from "./controllers/authController.js";
import express from 'express';
import checkInController from "./controllers/checkInController.js";
import { authenticate } from "./middleware/authenticate.js";
import leaveController from "./controllers/leaveController.js";

let router  = express.Router();

router.post('/register' , authController.register);
router.post('/login' , authController.login);

router.post('/check-in/:type' , authenticate, checkInController.updateCheckIn);
router.get('/check-in/status' , authenticate, checkInController.getCheckInStatus);
router.post('/leave-form', authenticate, leaveController.leaveform );
export default router;