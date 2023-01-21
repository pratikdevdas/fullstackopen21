import { Router } from 'express';
import medService from '../services/patientServices';
import toNewPatientPost from '../utils';

const router = Router();

router.get('/', (_req, res) => {
    res.send(medService.getPatients());
});

router.get('/:id', (_req, res) => {
    const id:string = _req.params.id;
    res.send(medService.getSinglePatient(id));
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientPost(req.body);
        const addedEntry = medService.addPatient(newPatientEntry);
        console.log(addedEntry);
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
