import { Router } from 'express';
import diaryService from '../services/diagnosisService';

const router = Router();

router.get('/',(_req,res) => {
  res.send(diaryService.getDiagnosis());
});

export default router;