import patient from '../../data/patients';
import { PatientInfo, HidePatientSsn, toNewPatientPost } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<PatientInfo> => {
    return patient;
};

// alternate syntax : Array<> or [] at end
const getPatientsWithoutSsn = (): HidePatientSsn[] => {
    return patient.map((n) => {
        return {
            id: n.id,
            name: n.name,
            dateOfBirth: n.dateOfBirth,
            gender: n.gender,
            occupation: n.occupation,
        };
    });
};

const getSinglePatient = (id: string): toNewPatientPost[] => {
    console.log(patient.filter(n => n.id === id));
    return patient.filter(n => n.id === id);
};

const id = uuid();

const addPatient = (entry: toNewPatientPost): PatientInfo => {
    const newDiaryEntry = {
        id: id,
        ...entry,
    };
    patient.push(newDiaryEntry);
    return newDiaryEntry;
};

export default {
    getPatients,
    getSinglePatient,
    getPatientsWithoutSsn,
    addPatient,
};
