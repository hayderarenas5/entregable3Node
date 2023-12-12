import express from 'express';
import { deleteUser, findAllUsers, findOneUser, register, updateUser } from './users.controller.js';
import { validateExistUser } from './user.middleware.js';

export const router = express.Router();

router.post('/register', register)

router
  .route('/')
  .get(findAllUsers)

router
  .route('/:id')
  .get(validateExistUser, findOneUser)
  .patch(validateExistUser, updateUser)
  .delete(validateExistUser, deleteUser);


  