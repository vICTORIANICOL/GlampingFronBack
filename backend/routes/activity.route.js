// routes/activity.route.js
import express from 'express';
import {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../handlers/activity.handler.js';

const router = express.Router();

router.get('/', getAllActivities);
router.get('/:id', getActivityById);
router.post('/', createActivity);
router.put('/', updateActivity);
router.delete('/:id', deleteActivity);

export default router;
