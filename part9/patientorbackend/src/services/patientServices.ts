/* eslint-disable @typescript-eslint/no-unsafe-call */
import patient from '../../data/patients';
import { PatientInfo, HidePatientSsn, toNewPatientPost, EntryWithoutId, Entry } from '../types';
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


const addPatient = (entry: toNewPatientPost): PatientInfo => {
    const id = uuid();
    const newDiaryEntry = {
        id: id,
        ...entry,
    };
    patient.push(newDiaryEntry);
    return newDiaryEntry;
};

const addInsidePatientEntry = (entryInsidePerson:EntryWithoutId, id:string):Entry => {
    const rio = patient.find(n => n.id === id)?.entries;
    const uid = uuid();
    const newEntry = {
        id:uid,
        ...entryInsidePerson
    };
    if(rio){
        rio.push(newEntry);
    }
    return newEntry;
};

export default {
    getPatients,
    getSinglePatient,
    getPatientsWithoutSsn,
    addPatient,
    addInsidePatientEntry
};
