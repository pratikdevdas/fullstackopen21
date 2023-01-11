import patient from '../../data/patients';
import { PatientInfo, HidePatientSsn } from '../types';

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

export default {
    getPatients,
    getPatientsWithoutSsn,
};
