export interface DiagnosisInfo {
    code: string;
    name: string;
    latin?: string;
}
type Gender = 'male' | 'female' | 'other';

export interface PatientInfo {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
}

export type HidePatientSsn = Omit<PatientInfo, 'ssn'>;
