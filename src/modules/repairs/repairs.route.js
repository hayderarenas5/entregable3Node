import express from 'express';
import { createRepair, deleteRepair, findAllRepairs, findOneRepair, updateRepair } from './repairs.controller.js';
import { validateExitRepairs } from './repairs.middleware.js';

export const router = express.Router();

router.post('/createRepair', createRepair)

router
  .route('/')
  .get(findAllRepairs)

router
  .route('/:id')
  .get(validateExitRepairs, findOneRepair)
  .patch(validateExitRepairs, updateRepair)
  .delete(validateExitRepairs, deleteRepair)