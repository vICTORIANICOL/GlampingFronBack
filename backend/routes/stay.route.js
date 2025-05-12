// routes/stay.route.js
import express from 'express';
import {
  getAllStays,
  getStayById,
  createStay,
  updateStay,
  deleteStay,
} from '../handlers/stay.handler.js';

const router = express.Router();

router.get('/', getAllStays);          // Hent alle ophold
router.get('/:id', getStayById);       // Hent ét ophold
router.post('/', createStay);          // Opret nyt ophold
router.put('/', updateStay);           // Opdater ophold (via _id)
router.delete('/:id', deleteStay);     // Slet ophold

export default router;
