// routes/user.route.js
import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../handlers/user.handler.js';

const router = express.Router();

// Fordi server.js bruger /users, så routes herfra er fx: GET /users/
router.get('/', getAllUsers); 
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
