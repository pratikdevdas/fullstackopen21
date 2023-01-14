export interface DiagnosisInfo {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender{
        Male = 'male',
        Female = 'female',
        Other = 'other'
}

export interface PatientInfo {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type HidePatientSsn = Omit<PatientInfo, 'ssn'>;
export type toNewPatientPost = Omit<PatientInfo, 'id'>;
