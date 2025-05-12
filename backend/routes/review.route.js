// routes/review.route.js
import express from 'express';
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../handlers/review.handler.js';

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/', createReview);
router.put('/', updateReview);
router.delete('/:id', deleteReview);

export default router;
