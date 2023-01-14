/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from 'express';
import medService from '../services/patientServices';

const router = Router();

router.get('/', (_req, res) => {
    res.send(medService.getPatients());
});

router.post('/', (req, res) => {
    const { ssn, name, gender, occupation, dateOfBirth } = req.body;
    const newPatientEntry = medService.addPatient({
        ssn,
        name,
        gender,
        occupation,
        dateOfBirth
    });
    res.json(newPatientEntry);
});

export default router;
