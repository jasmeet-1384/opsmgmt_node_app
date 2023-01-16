import authController from "./controllers/authController.js";
import express from 'express';
import checkInController from "./controllers/checkInController.js";
import { authenticate } from "./middleware/authenticate.js";
import leaveController from "./controllers/leaveController.js";
import changemanagementController from "./controllers/changemanagementController.js";
import projectonboardingController from "./controllers/projectonboardingController.js";
import timetrackerController from "./controllers/timetrackerController.js";
import kanbanController from "./controllers/kanbanController.js";
import appraisalController from "./controllers/appraisalController.js";

let router  = express.Router();

router.post('/register' , authController.register);
router.post('/login' , authController.login);

router.post('/check-in/:type' , authenticate, checkInController.updateCheckIn);
router.get('/check-in/status' , authenticate, checkInController.getCheckInStatus);
router.post('/leaveform', authenticate, leaveController.leaveform );
router.post('/change_management', authenticate, changemanagementController.changemanagement);
router.post('/project_onboarding', authenticate, projectonboardingController.projectonboarding);
router.post('/time_trackers', authenticate, timetrackerController.timetrackers);
router.post('/kanban', authenticate, kanbanController.kanban);
router.post('/appraisal', authenticate, appraisalController.appraisal);
router.post('/leave-update', authenticate, leaveController.updateleave);
router.post('/delete', authenticate, kanbanController.deletekanban);
export default router;