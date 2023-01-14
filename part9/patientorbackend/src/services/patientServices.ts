import patient from '../../data/patients';
import { PatientInfo, HidePatientSsn, NewPatientEntry } from '../types';
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

const id = uuid();

const addPatient = (entry: NewPatientEntry): PatientInfo => {
    const newDiaryEntry = {
        id:id,
        ...entry
    };
    patient.push(newDiaryEntry);
    return newDiaryEntry;
};
export default {
    getPatients,
    getPatientsWithoutSsn,
    addPatient,
};
