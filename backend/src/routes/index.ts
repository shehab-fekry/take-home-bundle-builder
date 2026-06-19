import express from 'express';
import { getDataApi } from '../controllers/index';

const router = express.Router();

router.get('/data', getDataApi);

export default router;
