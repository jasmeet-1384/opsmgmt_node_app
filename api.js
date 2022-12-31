import authController from "./controllers/authController.js";
import express from 'express';
import checkInController from "./controllers/checkInController.js";
import { authenticate } from "./middleware/authenticate.js";

let router  = express.Router();

router.post('/register' , authController.register);
router.post('/login' , authController.login);

router.post('/check-in/:type' , authenticate, checkInController.updateCheckIn);

export default router;