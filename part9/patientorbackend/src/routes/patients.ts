import { Router } from 'express';
import medService from '../services/patientServices';

const router = Router();

router.get('/', (_req, res) => {
    res.send(medService.getPatients());
});

export default router;
