import { Router } from 'express';
import medService from '../services/patientServices';
import toNewPatientPost from '../utils';

const router = Router();

router.get('/', (_req, res) => {
    res.send(medService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientPost(req.body);
        const addedEntry = medService.addPatient(newPatientEntry);

        res.json(addedEntry);
    } catch (error) {
        let errorMessage = 'Something bad happened';
        if(error instanceof Error){
            errorMessage += 'Error: ' + error.message;
        }
        res.status(404).send(errorMessage);
    }
});

export default router;
