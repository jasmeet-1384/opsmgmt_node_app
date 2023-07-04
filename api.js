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
import commentsController from "./controllers/commentsController.js";
import admin_authController from "./controllers/Admin/admin_authController.js";
import admin_leaveController from "./controllers/Admin/admin_leaveController.js";
import admin_projectonboardingController from "./controllers/Admin/admin_projectonboardingController.js";
import admin_timetrackerController from "./controllers/Admin/admin_timetrackerController.js";
import admin_changemanagementController from "./controllers/Admin/admin_changemanagementController.js";
import admin_checkInController from "./controllers/Admin/admin_checkInController.js";
import admin_appraisalController from "./controllers/Admin/admin_appraisalController.js";


let router  = express.Router();

//user
router.post('/register' , authController.register);
router.post('/login' , authController.login);
router.get('/user-list',authController.getUserList);
router.post('/check-in/:type/:en_ip' , authenticate, checkInController.updateCheckIn);
router.get('/check-in/status' , authenticate, checkInController.getCheckInStatus);
router.post('/leave_form', authenticate, leaveController.leaveform );
router.post('/leave-update/:id', authenticate, leaveController.updateleave);
router.post('/change_management', authenticate, changemanagementController.changemanagement);
router.post('/project_onboarding', authenticate, projectonboardingController.projectonboarding);
router.post('/time_trackers', authenticate, timetrackerController.timetrackers);
router.post('/kanban', authenticate, kanbanController.kanban);
router.post('/appraisal', authenticate, appraisalController.appraisal);
router.post('/leave-update', authenticate, leaveController.updateleave);
router.post('/delete', authenticate, kanbanController.deletekanban);
router.get('/leave-list', authenticate, leaveController.getleavedata);
router.get('/appraisal-list', authenticate, appraisalController.getAppraisalData);
router.get('/changemanagement-list', authenticate, changemanagementController.getchangemanagementdata);
router.get('/projectonboarding-list', authenticate, projectonboardingController.getprojectonboarding);
router.get('/timetracker-list', authenticate, timetrackerController.gettimetracker);
router.get('/kanban-list', authenticate, kanbanController.getkanban);
router.put('/kanban-update', authenticate,kanbanController.updateStatus);
router.post('/kanban-close/:task_id', authenticate,kanbanController.updateClosed);
router.post('/kanban-comments', authenticate, commentsController.kanbanComments);
router.get('/comments-list/:task_id', authenticate, commentsController.getcommentsdata);
router.delete('/comment-deleted/:id', authenticate, commentsController.deletekanbancomments);

//Admin
router.post('/admin_register', admin_authController.register);
router.post('/admin_login', admin_authController.login);
router.post('/admin_leave_form', authenticate, admin_leaveController.leaveform);
router.post('/admin_project_onboarding', authenticate, admin_projectonboardingController.projectonboarding);
router.post('/admin_timetracker', authenticate, admin_timetrackerController.timetrackers);
router.post('/admin_changemanagement', authenticate, admin_changemanagementController.changemanagement);
router.post('/admin_check-in/:type/:en_ip', authenticate, admin_checkInController.updateCheckIn);
router.get('/admin_check-in/status', authenticate, admin_checkInController.getCheckInStatus);
router.post('/admin_appraisal', authenticate, admin_appraisalController.appraisal);
router.get('/admin_appraisal-list', authenticate, admin_appraisalController.getAppraisalData);
router.get('/admin_leave-list', authenticate, admin_leaveController.getleavedata);

export default router;
