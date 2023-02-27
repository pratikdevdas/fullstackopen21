/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from 'express';
import medService from '../services/patientServices';
// import { Entry } from '../types';
import { patientTypeguard, entryTypeguard } from '../utils';

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
        const newPatientEntry = patientTypeguard(req.body);
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

router.post('/:id/entries', (req, res) => {
    try {
        const id:string = req.params.id;
        console.log(req.body);
        const entryInsidePatient = entryTypeguard(req.body);
        const addEntryInsidePatient = medService.addInsidePatientEntry(entryInsidePatient,id);
        res.json(addEntryInsidePatient);
    } catch (error) {
        let errorMessage = 'Something bad happened';
        if(error instanceof Error){
            errorMessage += 'Error: ' + error.message;
        }
        res.status(404).send(errorMessage);
    }
});
export default router;
